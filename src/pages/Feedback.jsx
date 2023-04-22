import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { updateRanking, resetState } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    const { player, dispatch } = this.props;
    dispatch(updateRanking(player));

    const existingRanking = JSON.parse(localStorage.getItem('ranking')) || [];

    const updatedPlayer = {
      index: existingRanking.length,
      name: player.name,
      assertions: player.assertions,
      score: player.score,
      email: player.email,
    };

    const updatedRanking = [...existingRanking, updatedPlayer];

    localStorage.setItem('ranking', JSON.stringify(updatedRanking));
  }

  restartGame = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(resetState());
  };

  render() {
    const { assertions, history } = this.props;

    const minAnswers = 3;

    const successFeedback = (
      <p>Well Done!</p>
    );

    const failureFeedback = (
      <p>Could be better...</p>
    );

    return (
      <>
        <Header />
        <div
          data-testid="feedback-text"
        >
          { assertions >= minAnswers ? successFeedback : failureFeedback }
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ this.restartGame }
        >
          Play again

        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  player: state.player,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    assertions: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
