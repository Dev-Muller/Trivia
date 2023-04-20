import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services/fetchApi';
import Header from '../components/Header';

class Game extends Component {
  state = {
    results: [],
    mapAnswers: [],
    currentIndex: 0,
  };

  componentDidMount() {
    this.getResults();
  }

  getResults = async () => {
    const response = await fetchQuestions(localStorage.getItem('token'));
    console.log(response);
    const { history } = this.props;

    if (response.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.getQuestions(response.results);
    }
  };

  getQuestions = async (results) => {
    const { currentIndex } = this.state;

    const currentQuestion = results[currentIndex];

    const allAnswers = [
      { answer: currentQuestion.correct_answer, correct: true },
      ...currentQuestion.incorrect_answers.map((answer) => ({
        answer,
        correct: false,
      })),
    ];

    this.randomArray(allAnswers);

    const mapAnswers = allAnswers.map((answerObj, index) => (
      <button
        key={ index }
        data-testid={
          answerObj.correct
            ? 'correct-answer'
            : `wrong-answer-${index}`
        }
      >
        {answerObj.answer}
      </button>
    ));

    this.setState({ results, mapAnswers });
  };

  randomArray = (array) => {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length; let
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  render() {
    const { results, currentIndex, mapAnswers } = this.state;

    // const currentQuestion = results[currentIndex];

    // const allAnswers = [
    //   { answer: currentQuestion.correct_answer, correct: true },
    //   ...currentQuestion.incorrect_answers.map((answer) => ({
    //     answer,
    //     correct: false,
    //   })),
    // ];

    // this.randomArray(allAnswers);

    // const mapAnswers = allAnswers.map((answerObj, index) => (
    //   <button
    //     key={ index }
    //     data-testid={
    //       answerObj.correct
    //         ? 'correct-answer'
    //         : `wrong-answer-${index}`
    //     }
    //   >
    //     {answerObj.answer}
    //   </button>
    // ));

    return (
      <div>
        <Header />
        <h2 data-testid="question-category">
          {results[currentIndex]?.category}
        </h2>
        <p data-testid="question-text">
          {results[currentIndex]?.question}
        </p>
        <div data-testid="answer-options">
          {mapAnswers}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
