import { ECharMatch, ICharacter } from "../types";

const getCharacterClass = (match: ECharMatch, pop: boolean): string => {
  let charClass = "";
  switch (match) {
    case ECharMatch.FULL:
      charClass = " green";
      break;
    case ECharMatch.PARTIAL:
      charClass = " yellow";
      break;
    case ECharMatch.NONE:
      charClass = " grey";
      break;
    default:
      charClass = "";
  }
  if (pop) charClass += " typed";
  return charClass;
};

const Character = ({ character, wasTyped }: { character: ICharacter; wasTyped: boolean }) => {
  const charClass = getCharacterClass(character.match, wasTyped);
  return <div className={`character${charClass}`}>{character.character}</div>;
};

export default Character;
