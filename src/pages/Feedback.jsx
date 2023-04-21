import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
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
          onClick={ () => history.push('/') }
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
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
