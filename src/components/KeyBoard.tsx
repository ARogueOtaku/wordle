import { ECharSize, ICharacter } from "../types";
import Character from "./Character";

interface IKeyboardProps {
  characters: Array<ICharacter>;
  handleCharacterClick: (characterString: string) => void;
  currentCharacter: string;
}

const Keyboard = ({ characters, handleCharacterClick, currentCharacter }: IKeyboardProps) => {
  return (
    <div className="keyboard">
      {characters.map((character, index) => (
        <Character
          character={character}
          key={`keyboard-${index}`}
          onClick={() => handleCharacterClick(character.character)}
          size={ECharSize.SMALL}
          wasTyped={character.character.toLowerCase() === currentCharacter}
          rounded
        />
      ))}
    </div>
  );
};

export default Keyboard;
