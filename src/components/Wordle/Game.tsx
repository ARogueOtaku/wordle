import Grid from "./Grid";
import Loading from "../Loading";
import Keyboard from "../KeyBoard";
import { useContext } from "react";
import WordleContext from "../../contexts/WordleContext";

const Game = ({ loading }: { loading: boolean }) => {
  const { keyboardCharacters, currentKeyboardCharacter, handleKeyboardClick } = useContext(WordleContext);
  return (
    <div className="game">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid />
          <Keyboard
            characters={keyboardCharacters}
            currentCharacter={currentKeyboardCharacter}
            handleCharacterClick={handleKeyboardClick}
          />
        </>
      )}
    </div>
  );
};

export default Game;
