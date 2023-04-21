import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../services/fetchApi';
import Header from '../components/Header';
import { updateScore } from '../redux/actions';

class Game extends Component {
  state = {
    results: [],
    currentIndex: 0,
    clickedAnswer: null,
    timer: 30,
    shuffledAnswers: [],
    // userCorrectAnswers: 0,
    userIncorrectAnswers: 0,
    nextButton: false,
  };

  componentDidMount() {
    this.getResults();
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  getResults = async () => {
    const response = await fetchQuestions(localStorage.getItem('token'));
    const { history } = this.props;
    console.log(response);

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
    const { shuffledAnswers, timer, currentIndex, results } = this.state;
    const { dispatch } = this.props;
    const answerObj = shuffledAnswers[index];
    const difficulty = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const currentQuestion = results[currentIndex];

    const BASE_POINTS = 10;

    if (answerObj.correct) {
      const points = BASE_POINTS + timer * difficulty[currentQuestion.difficulty];
      const isCorrect = true;
      dispatch(updateScore({ points, isCorrect }));
    }

    this.setState({ clickedAnswer: index, nextButton: true });
  };

  startTimer = () => {
    const ONE_SECOND_INTERVAL = 1000;
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer === 0) {
          clearInterval(this.timerInterval);
          return {
            timer: 0,
            userIncorrectAnswers: prevState.userIncorrectAnswers + 1,
            nextButton: true,
          };
        }
        return { timer: prevState.timer - 1 };
      });
    }, ONE_SECOND_INTERVAL);
  };

  nextQuestion = () => {
    const { currentIndex, results } = this.state;
    this.setState(
      (prevState) => ({
        currentIndex: prevState.currentIndex + 1,
        clickedAnswer: null,
        timer: 30,
        nextButton: false,
      }),
      () => {
        if (currentIndex === results.length - 1) {
          const { history } = this.props;
          history.push('/feedback');
        } else {
          this.shuffleAnswers();
          this.startTimer();
        }
      },
    );
  };

  render() {
    const {
      results,
      currentIndex,
      clickedAnswer,
      timer,
      shuffledAnswers,
      nextButton,
    } = this.state;

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
          {nextButton
          && <button data-testid="btn-next" onClick={ this.nextQuestion }>Next</button>}
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

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
