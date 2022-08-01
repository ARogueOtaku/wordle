import { ECharMatch, ECharSize, ICharacter } from "../types";

interface ICharacterProps {
  character: ICharacter;
  wasTyped?: boolean;
  size?: ECharSize;
  rounded?: boolean;
  onClick?: () => void;
}

const getCharacterClass = (match: ECharMatch, size: ECharSize, pop: boolean, rounded: boolean): string => {
  let charClass = "";
  switch (match) {
    case ECharMatch.FULL:
      charClass += " green";
      break;
    case ECharMatch.PARTIAL:
      charClass += " yellow";
      break;
    case ECharMatch.NONE:
      charClass += " grey";
      break;
    case ECharMatch.OTHER:
      charClass += " lightgrey";
      break;
    default:
      break;
  }
  switch (size) {
    case ECharSize.XSMALL:
      charClass += " extra-small";
      break;
    case ECharSize.SMALL:
      charClass += " small";
      break;
    case ECharSize.MEDIUM:
      charClass += " medium";
      break;
    case ECharSize.LARGE:
      charClass += " large";
      break;
    case ECharSize.XLARGE:
      charClass += " extra-large";
      break;
    default:
      break;
  }
  if (pop) charClass += " typed";
  if (rounded) charClass += " rounded";
  return charClass;
};

const Character = ({
  character,
  wasTyped = false,
  size = ECharSize.MEDIUM,
  rounded = false,
  onClick,
}: ICharacterProps) => {
  const charClass = getCharacterClass(character.match, size, wasTyped, rounded);
  let element = <div className={`character${charClass}`}>{character.character}</div>;
  if (onClick)
    element = (
      <button type="button" onClick={onClick} className={`character${charClass}`}>
        {character.character}
      </button>
    );
  return element;
};

export default Character;
