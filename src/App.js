import React from 'react';
import Game from './components/Game';
import GameHistory from './components/GameHistory';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gamesPlayed: [],
    };

    this.onGame = this.onGame.bind(this);
  }

  onGame(game) {
    // alert('onGame called');
    this.setState((state, props) => {
      // TODO: wtf, this is called twice
      console.log(state.gamesPlayed);
      state.gamesPlayed.push(game);
      console.log(state.gamesPlayed);
      return {
        gamesPlayed: state.gamesPlayed,
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Rock Paper Sccisors</h1>
        <Game onGame={this.onGame} />
        <GameHistory history={this.state.gamesPlayed} />
      </div>
    );
  }
}

export default App;
