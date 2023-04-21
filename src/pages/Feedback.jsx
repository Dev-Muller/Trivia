import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { correctAnswers } = this.props;

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
          { correctAnswers >= minAnswers ? successFeedback : failureFeedback }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAnswers: state.player.correctAnswers,
});

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
