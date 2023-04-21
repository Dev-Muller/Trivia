import { EMAIL, NAME, TOKEN, SCORE } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: null, // add 20abr
  assertions: '',
  score: 0,
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
  case SCORE:
    return {
      ...state,
      score: state.score + payload,
    };
  default:
    return state;
  }
}

export default userReducer;
