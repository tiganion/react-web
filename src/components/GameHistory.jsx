import React from 'react';
import PropTypes from 'prop-types';
import { translateStatusToHuman } from './label-utils';

class GameHistory extends React.Component {
  constructor(props) {
    super(props);

    // now if the state of 'props.history' changes from where it passed, the component using gamesPlayed will see that
    this.state = {
      gamesPlayed: props.history,
    };
  }

  render() {
    const { gamesPlayed } = this.state;
    const gameHistory = gamesPlayed.sort((gameOne, gameTwo) => gameTwo.date - gameOne.date).map((game) => (
      <div className="historical-game">
        <span>
          Date played:
          {game.date.toISOString()}
        </span>
        <br />
        <span>
          Outcome:
          {translateStatusToHuman(game.status)}
        </span>
        <br />
        <span>
          Human choise:
          {game.playerMove}
        </span>
        <br />
        <span>
          CPU Choise:
          {game.opponentMove}
        </span>
        <br />
      </div>
    ));

    return (
      <div>
        <h1>Games history</h1>
        {gameHistory}
      </div>
    );
  }
}

export default GameHistory;

GameHistory.propTypes = {
  history: PropTypes.array.isRequired,
};
