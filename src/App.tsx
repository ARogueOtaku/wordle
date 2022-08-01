import { useCallback, useContext, useEffect, useState } from "react";
import "./App.css";
import Game from "./components/Wordle/Game";
import NavBar from "./components/NavBar";
import { WordleProvider } from "./contexts/WordleContext";
import fetchWords from "./services/proto/fetchWords";
import ThemeContext from "./contexts/ThemeContext";

const maxGuess = parseInt(process.env.REACT_APP_MAXIMUM_GUESS ?? "6");

const App = () => {
  const [theWord, setTheWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const fetchTheWord = useCallback(async () => {
    setLoading(true);
    try {
      const word = await fetchWords();
      setTheWord(word);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTheWord();
  }, [fetchTheWord]);

  return (
    <div className={`app ${theme}`}>
      <WordleProvider maxGuess={maxGuess} word={theWord} fetchNewWord={fetchTheWord}>
        <NavBar headerText="wordle" />
        <Game loading={loading} />
      </WordleProvider>
    </div>
  );
};

export default App;
