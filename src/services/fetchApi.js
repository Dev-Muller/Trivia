export const fetchToken = async () => {
  const RESPONSE = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await RESPONSE.json();
  return token;
};
