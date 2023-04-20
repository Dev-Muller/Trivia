// import { fetchToken } from '../../services/fetchApi';

// actions
export const EMAIL = 'email';
export const NAME = 'name';
export const TOKEN = 'token';
export const QUESTIONS = 'questions';
export const SCORE = 'score';

export const emailLogin = (payload) => ({
  type: EMAIL,
  payload,
});

export const nameLogin = (payload) => ({
  type: NAME,
  payload,
});

export const tokenLogin = (payload) => ({
  type: TOKEN,
  payload,
});

export const scoreHeader = (payload) => ({
  type: SCORE,
  payload,
});

export const fetchQuestions = (payload) => ({
  type: QUESTIONS,
  payload,
});

// export const fetchUserToken = () => async (dispatch) => {
//   const userTokenResponse = await fetchToken();
//   localStorage.setItem('token', JSON.stringify(userTokenResponse));
//   // const userToken = { userTokenResponse };
//   // dispatch(tokenLogin(userToken));
// };
