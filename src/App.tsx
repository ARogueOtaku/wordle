import { useCallback, useContext, useEffect, useState } from "react";
import "./App.css";
import Game from "./components/Wordle/Game";
import NavBar from "./components/NavBar";
import { WordleProvider } from "./contexts/WordleContext";
import fetchWords from "./services/memory/fetchWords";
import ThemeContext from "./contexts/ThemeContext";
import useMediaQuery from "./hooks/useMediaQuery";
import NoGameOverlay from "./components/NoGameOverlay";

const maxGuess = parseInt(process.env.REACT_APP_MAXIMUM_GUESS ?? "6");

const App = () => {
  const [theWord, setTheWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 719px) or (max-height: 700px)");

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
        {isMobile ? (
          <NoGameOverlay text={"Smaller screens are not supported! 🙏🏽"} />
        ) : (
          <>
            <NavBar headerText="wordle" />
            <Game loading={loading} />
          </>
        )}
      </WordleProvider>
    </div>
  );
};

export default App;
