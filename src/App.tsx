import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Loading from "./components/Loading";
import { WordleProvider } from "./contexts/WordleContext";
import fetchWords from "./services/proto/fetchWords";

const maxGuess = parseInt(process.env.REACT_APP_MAXIMUM_GUESS ?? "6");

const App = () => {
  const [theWord, setTheWord] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTheWord = useCallback(async () => {
    setLoading(true);
    const word = await fetchWords();
    setTheWord(word);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTheWord();
  }, [fetchTheWord]);

  return (
    <div className="app dark">
      <WordleProvider maxGuess={maxGuess} word={theWord} generateWord={fetchTheWord}>
        {loading || theWord.length === 0 ? <Loading /> : <Grid />}
      </WordleProvider>
    </div>
  );
};

export default App;
