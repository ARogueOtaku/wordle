import { useContext } from "react";
import WordleContext from "../../contexts/WordleContext";
import { ECharSize } from "../../types";
import Word from "./Word";

const Grid = () => {
  const { words, currentWordIndex, currentWordCharacterIndex, isInvalidWord, setIsInvalidWord, gameEnded } =
    useContext(WordleContext);
  return (
    <>
      <div className="wordlegrid" data-testid="app">
        {words.map((word, i) => (
          <Word
            key={i}
            word={word}
            charSize={ECharSize.MEDIUM}
            isCurrent={i === currentWordIndex && !gameEnded}
            currentWordCharacterIndex={currentWordCharacterIndex}
            isInvalid={isInvalidWord && i === currentWordIndex}
            onInvalid={() => {
              setIsInvalidWord(false);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Grid;
