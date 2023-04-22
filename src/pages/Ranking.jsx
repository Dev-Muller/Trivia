import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RankingCard from '../components/RankingCard';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    const sortedRanking = ranking.sort((a, b) => Number(b.score) - Number(a.score));

    const mapRanking = sortedRanking.map((player, index) => (
      <RankingCard
        key={ index }
        name={ player.name }
        email={ player.email }
        score={ player.score }
        index={ index }
      />
    ));

    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
        {mapRanking}
        <button
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Play again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
