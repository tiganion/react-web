import React from 'react';
import PropTypes from 'prop-types';
import { translateStatusToHuman } from './label-utils';

class Game extends React.Component {
  constructor(props) {
    super(props);

    /*
        this.state assignment can be done just in the constructor
        outside we must use this.setState() as react knows how to tract the changes and then update the components
      */
    this.state = {
      played: false,
      status: null,
      playerMove: null,
      opponentMove: null,
    };

    /*
       * this is the binding in action, in order to have the components see/call our funcitons we need to bind them
       * notice: that I did not bind the method at first, and it kind of worked, well it worked as long as I didn't try to access 'this'
       * most of the time if the function you are calling fails with 'can't access/call method on 'this' because undefined' the most probably you are missing the binding
       */
    this.rock = this.rock.bind(this);
    this.paper = this.paper.bind(this);
    this.scissors = this.scissors.bind(this);
    this.notifyGame = this.notifyGame.bind(this);
    this.playerMove = this.playerMove.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  // todo: rename to save game to history ?
  notifyGame() {
    const gameDetails = {
      status: this.state.status,
      playerMove: this.state.playerMove,
      opponentMove: this.state.opponentMove,
      date: new Date(),
    };

    // this looks directly into props, maybe this can be saved somehwere
    this.props.onGame(gameDetails);
  }

  playerMove(playerMove) {
    if (!this.state.played) {
      const opponentMove = chooseRandomAction();
      const status = chooseWinner(playerMove, opponentMove);

      // here we update the state
      this.setState({
        played: true,
        status,
        playerMove,
        opponentMove,
      },
      // here is a callback, for when the state was updated
      () => this.notifyGame());
    } else {
      alert('game finished, must restart');
    }
  }

  rock() {
    this.playerMove('Rock');
  }

  paper() {
    this.playerMove('Paper');
  }

  scissors() {
    this.playerMove('Scissors');
  }

  resetGame() {
    this.setState({
      played: false,
      status: null,
      playerMove: null,
      opponentMove: null,
    });
  }

  render() {
    const {
      played, status, playerMove, opponentMove,
    } = this.state;
    /**
       * Here we can execute other code before the actual render
       */
    const gameStatusString = played ? translateStatusToHuman(status) : '';
    const playerMoveString = played ? playerMove : '';
    const opponentMoveString = played ? opponentMove : '';

    // TODO: can I write these better ?
    const playButtons = (
      <div>
        <button type="button" onClick={this.rock}>Rock</button>
        <button type="button" onClick={this.paper}>Paper</button>
        <button type="button" onClick={this.scissors}>Sccisors</button>
      </div>
    );
    const resetButton = <button type="button" onClick={this.resetGame}>New Game</button>;

    const gameButtons = played ? resetButton : playButtons;

    return (
      <div>
        {gameButtons}
        <br />
        <span>
          {' '}
          Game status:
          {gameStatusString}
        </span>
        <br />
        <span>
          {' '}
          Player move:
          {playerMoveString}
        </span>
        <br />
        <span>
          {' '}
          CPU choice:
          {opponentMoveString}
        </span>
        <br />
      </div>
    );
  }
}

function chooseRandomAction() {
  const moves = ['Rock', 'Paper', 'Scissors'];
  const randomNumber = Math.floor(Math.random() * 3);
  const randomMove = moves[randomNumber];
  return randomMove;
}

/*
   -1 player lost
   0 tie
   1 player won
  */
function chooseWinner(playerMove, opponentMove) {
  if (playerMove === opponentMove) {
    return 0;
  }

  if (playerMove === 'Rock') {
    if (opponentMove === 'Paper') return -1;
    if (opponentMove === 'Scissors') return 1;
  }

  if (playerMove === 'Paper') {
    if (opponentMove === 'Rock') return 1;
    if (opponentMove === 'Scissors') return -1;
  }

  if (playerMove === 'Scissors') {
    if (opponentMove === 'Paper') return 1;
    if (opponentMove === 'Rock') return -1;
  }

  return undefined;
}

export default Game;

Game.propTypes = {
  onGame: PropTypes.func.isRequired,
};
