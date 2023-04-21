import { EMAIL, NAME, TOKEN, SCORE } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: null, // add 20abr
  score: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
  case EMAIL:
    return {
      ...state,
      email: payload,
    };
  case NAME:
    return {
      ...state,
      name: payload,
    };
  case TOKEN:
    return {
      ...state,
      token: payload,
    };
  case SCORE: {
    const { points, isCorrect } = payload;
    return {
      ...state,
      score: state.score + points,
      correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
      incorrectAnswers: !isCorrect ? state.incorrectAnswers + 1 : state.incorrectAnswers,
    };
  }
  default:
    return state;
  }
}

export default userReducer;
