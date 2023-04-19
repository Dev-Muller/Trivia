import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services/fetchApi';

class Game extends Component {
  render() {
    const { results } = JSON.parse(localStorage.getItem('results'));
    console.log(results);

    return (
      <div />
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
