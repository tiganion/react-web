import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
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
      <Container>
        <Jumbotron>
          <h1>Rock Paper Sccisors</h1>
          <p className="lead">This is a game that you can play against a CPU. It's not meant for 'production'</p>
          <h2>This exists because I'm learning React</h2>
        </Jumbotron>
        <Game onGame={this.onGame} />
        <GameHistory history={this.state.gamesPlayed} />
      </Container>
    );
  }
}

export default App;
