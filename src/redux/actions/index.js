import { fetchToken } from '../../services/fetchApi';

// actions
export const EMAIL = 'email';
export const NAME = 'name';
export const TOKEN = 'token';

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

export const fetchUserToken = (payload) => async (dispatch) => {
  const userTokenResponse = await fetchToken();
  localStorage.setItem('token', userTokenResponse);
  const userToken = { ...payload, userTokenResponse };
  dispatch(tokenLogin(userToken));
};
