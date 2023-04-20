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
    shuffledAnswers: [],
    // userCorrectAnswers: 0,
    userIncorrectAnswers: 0,
  };

  componentDidMount() {
    this.getResults();
    this.startTimer();
  }

  getResults = async () => {
    const response = await fetchQuestions(localStorage.getItem('token'));
    const { history } = this.props;

    if (response.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ results: response.results }, () => {
        this.shuffleAnswers();
      });
    }
  };

  shuffleAnswers = () => {
    const { results, currentIndex } = this.state;
    const currentQuestion = results[currentIndex];

    if (currentQuestion) {
      const allAnswers = [
        { answer: currentQuestion.correct_answer, correct: true },
        ...currentQuestion.incorrect_answers.map((answer) => ({
          answer,
          correct: false,
        })),
      ];

      this.setState({ shuffledAnswers: this.randomArray(allAnswers) });
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

  startTimer = () => {
    const ONE_SECOND_INTERVAL = 1000;
    const timerInterval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer === 0) {
          clearInterval(timerInterval);
          return { timer: 0, userIncorrectAnswers: prevState.userIncorrectAnswers + 1 };
        }
        return { timer: prevState.timer - 1 };
      });
    }, ONE_SECOND_INTERVAL);
  };

  render() {
    const { results, currentIndex, clickedAnswer, timer, shuffledAnswers } = this.state;
    const currentQuestion = results[currentIndex];

    if (currentQuestion) {
      const mapAnswers = shuffledAnswers.map((answerObj, index) => {
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
            disabled={ timer === 0 }
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
          <p>{timer}</p>
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
