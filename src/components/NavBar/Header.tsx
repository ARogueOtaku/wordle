import { ECharSize } from "../../types";
import { generateWord, getValidatedWord } from "../../utils/wordleUtils";
import Word from "../Wordle/Word";

interface IHeaderProps {
  text: string;
  verifyText?: string;
  size: ECharSize;
}

const getHeaderWord = (text: string, verifyText = "") => {
  const word = generateWord(text);
  return getValidatedWord(word, verifyText);
};

const Header = ({ text, verifyText, size }: IHeaderProps) => {
  return (
    <div className="header">
      <Word word={getHeaderWord(text, verifyText)} charSize={size} />
    </div>
  );
};

export default Header;
