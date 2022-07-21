const fetchWords = async (): Promise<string> => {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_REST_ENDPOINT}` ?? "");
  const words = await response.json();
  const word = words[Math.floor(Math.random() * words.length)];
  return word;
};

export default fetchWords;
