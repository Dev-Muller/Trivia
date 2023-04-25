import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class RankingCard extends Component {
  render() {
    const { name, email, score, index } = this.props;
    const hash = md5(email).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div data-testid="ranking-card">
        <img src={ gravatarUrl } alt="Player" />
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </div>
    );
  }
}

RankingCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default RankingCard;
