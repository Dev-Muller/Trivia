import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services/fetchApi';
import Header from '../components/Header';

class Game extends Component {
  state = {
    results: [],
    currentIndex: 0,
    clickedAnswer: null,
    timer: 30,
  };

  componentDidMount() {
    this.getResults();
    this.decrementTimer();
  }

  getResults = async () => {
    const response = await fetchQuestions(localStorage.getItem('token'));
    const { history } = this.props;

    if (response.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ results: response.results });
    }
  };

  randomArray = (array) => {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  handleClickedAnwers = (index) => {
    this.setState({ clickedAnswer: index });
  };

  decrementTimer = () => {
    const interval = 1000;
    setInterval(() => {
      this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
    }, interval);
  };

  render() {
    const { results, currentIndex, clickedAnswer, timer } = this.state;
    const currentQuestion = results[currentIndex];
    console.log(timer);

    if (currentQuestion) {
      const allAnswers = [
        { answer: currentQuestion.correct_answer, correct: true },
        ...currentQuestion.incorrect_answers.map((answer) => ({
          answer,
          correct: false,
        })),
      ];

      this.randomArray(allAnswers);

      const mapAnswers = allAnswers.map((answerObj, index) => {
        let borderColor;

        if (clickedAnswer !== null) {
          if (answerObj.correct) {
            borderColor = '3px solid rgb(6, 240, 15)';
          } else {
            borderColor = '3px solid red';
          }
        }

        return (
          <button
            onClick={ () => this.handleClickedAnwers(index) }
            key={ index }
            data-testid={
              answerObj.correct
                ? 'correct-answer'
                : `wrong-answer-${index}`
            }
            style={ { border: borderColor } }
          >
            {answerObj.answer}
          </button>
        );
      });

      return (
        <div>
          <Header />
          <h2 data-testid="question-category">
            {results[currentIndex]?.category}
          </h2>
          <p data-testid="question-text">
            {results[currentIndex]?.question}
          </p>
          <div data-testid="answer-options">{mapAnswers}</div>
        </div>
      );
    }
    return (
      <div>
        <Header />
        <p>Loading...</p>
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
