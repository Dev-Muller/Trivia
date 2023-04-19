// actions
export const EMAIL = 'email';
export const NAME = 'name';

export const emailLogin = (payload) => ({
  type: EMAIL,
  payload,
});

export const nameLogin = (payload) => ({
  type: NAME,
  payload,
});
