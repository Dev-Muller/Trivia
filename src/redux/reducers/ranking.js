import { RANKING } from '../actions';

const INITIAL_STATE = {
  ranking: [],
};

function rankingReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
  case RANKING:
    return {
      ...state,
      ranking: [...state.ranking, payload],
    };
  default:
    return state;
  }
}

export default rankingReducer;
