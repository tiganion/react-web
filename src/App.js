import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Rock Paper Sccisors</h1>
        <Game/>
      </div>
      )
  }
}

class Game extends React.Component {
  constructor(props){
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
    this.playerMove = this.playerMove.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  playerMove(playerMove){
    if(!this.state.played){
      let opponentMove = chooseRandomAction();
      let status = chooseWinner(playerMove, opponentMove);
      
      // here we update the state
      this.setState({
        played: true,
        status: status,
        playerMove: playerMove,
        opponentMove: opponentMove,
      });

    } else {
      alert('game finished, must restart');
    }
  }

  rock(){
    this.playerMove('Rock');
  }

  paper(){
    this.playerMove('Paper');
  }

  scissors(){
    this.playerMove('Scissors');
  }

  resetGame(){
    this.setState({
      played: false,
      status: null,
      playerMove: null,
      opponentMove: null,
    });
  }

  render(){

    /**
     * Here we can execute other code before the actual render
     */
    let gameStatus = this.state.played ? translateStatusToHuman(this.state.status) : '';
    let playerMove = this.state.played ? this.state.playerMove : '';
    let opponentMove = this.state.played ? this.state.opponentMove : '';

    let resetButton = this.state.played ? <button onClick={this.resetGame}>Reset</button> : '';
    

    return (
      <div>
          <button onClick={this.rock}>Rock</button>
          <button onClick={this.paper}>Paper</button>
          <button onClick={this.scissors}>Sccisors</button>
          <br/>
          <span> Game status: {gameStatus} </span>
          <br/>
          <span> Player move: {playerMove} </span>
          <br/>
          <span> CPU choice: {opponentMove} </span>
          <br/>
          {resetButton}
      </div>
     )
  }
}

function chooseRandomAction(){
  let moves = ['Rock', 'Paper', 'Scissors'];
  let randomNumber = Math.floor(Math.random() * 3);
  let randomMove = moves[randomNumber];
  return randomMove; 
}

/*
 -1 player lost
 0 tie
 1 player won
*/
function chooseWinner(playerMove, opponentMove){
  if (playerMove === opponentMove){
    return 0;
  }

  if (playerMove === 'Rock'){
    if(opponentMove === 'Paper') return -1;
    if(opponentMove === 'Scissors') return 1;
  }

  if (playerMove === 'Paper'){
    if(opponentMove === 'Rock') return 1;
    if(opponentMove === 'Scissors') return -1;
  }

  if (playerMove === 'Scissors'){
    if(opponentMove === 'Paper') return 1;
    if(opponentMove === 'Rock') return -1;
  }
}

// we can use arrow functions as well
let translateStatusToHuman = (status) => {
  if(status === -1){
    return 'Player lost';
  } else if (status === 1) {
    return 'Player won';
  } else {
    return 'Tie';
  }
}

export default App;
