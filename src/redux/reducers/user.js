import { EMAIL, NAME } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
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
  default:
    return state;
  }
}

export default userReducer;
