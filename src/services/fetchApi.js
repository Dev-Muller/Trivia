export const fetchToken = async () => {
  const RESPONSE = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await RESPONSE.json();
  return token;
};

export const fetchQuestions = async (token) => {
  const RESPONSE = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const results = await RESPONSE.json();
  return results;
};
