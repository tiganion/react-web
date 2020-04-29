import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Container, CardHeader, CardBody,
  CardText,
} from 'reactstrap';
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
      <Card>
        <CardHeader>
          {translateStatusToHuman(game.status)}
          {' '}
          -
          {' '}
          {game.date.toISOString()}
        </CardHeader>
        <CardBody>
          <CardText>
            <span>
              Human choise:
              {game.playerMove}
            </span>
            <br />
            <span>
              CPU Choise:
              {game.opponentMove}
            </span>
          </CardText>
        </CardBody>
      </Card>
    ));

    return (
      <Container>
        <h1>Game history</h1>
        {gameHistory}
      </Container>
    );
  }
}

export default GameHistory;

GameHistory.propTypes = {
  history: PropTypes.array.isRequired,
};
