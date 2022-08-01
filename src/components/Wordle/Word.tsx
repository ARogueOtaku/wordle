import { ECharSize, IWord } from "../../types";
import Character from "../Character";

interface IWordProps {
  word: IWord;
  isCurrent?: boolean;
  charSize: ECharSize;
  currentWordCharacterIndex?: number;
  isInvalid?: boolean;
  onInvalid?: () => void;
}

const Word = ({ word, isCurrent, charSize, currentWordCharacterIndex, isInvalid, onInvalid }: IWordProps) => {
  return (
    <div
      className={`word${isInvalid ? " invalid" : ""}`}
      onAnimationEnd={(event) => {
        if (event.animationName === "shake") onInvalid?.();
      }}
    >
      {word.characters.map((character, i) => {
        let wasTyped = false;
        if (typeof currentWordCharacterIndex === "number") wasTyped = currentWordCharacterIndex - 1 >= i && !!isCurrent;
        return <Character key={i} character={character} wasTyped={wasTyped} size={charSize} />;
      })}
    </div>
  );
};

export default Word;
