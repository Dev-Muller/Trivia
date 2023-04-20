import { QUESTIONS } from '../actions';

const INITIAL_STATE = {
  apiQuestions: [],
};

function gameReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
  case QUESTIONS:
    return {
      ...state,
      apiQuestions: payload.results,
    };
  default:
    return state;
  }
}

export default gameReducer;
