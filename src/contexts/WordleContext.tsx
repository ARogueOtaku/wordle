import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import Message from "../components/Message";
import useToast from "../hooks/useToast";
import { generateCharacter, generateLine, getValidatedLine } from "../utils/lineUtils";
import { ICharacter, ILine } from "../types";

interface IWordleProviderProps {
  maxGuess: number;
  word: string;
  children: ReactNode;
  generateWord: () => void;
}

interface IWordleContextProps {
  lines: Array<ILine>;
  currentLineIndex: number;
  currentLineCharacterIndex: number;
  isInvalidLine: boolean;
  setIsInvalidLine: Dispatch<SetStateAction<boolean>>;
  setMessage: (message: string) => void;
  gameEnded: boolean;
  resetGame: () => void;
}

const WordleContext = createContext<IWordleContextProps>({} as IWordleContextProps);

export const WordleProvider = ({ maxGuess, word, children, generateWord }: IWordleProviderProps) => {
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [currentLineCharacterIndex, setCurrentLineCharacterIndex] = useState<number>(0);
  const [isInvalidLine, setIsInvalidLine] = useState<boolean>(false);
  const [lines, setLines] = useState<Array<ILine>>(Array.from({ length: maxGuess }, generateLine));
  const { open, message, setToast } = useToast();

  const resetGame = useCallback(() => {
    setCurrentLineIndex(0);
    setCurrentLineCharacterIndex(0);
    setLines(Array.from({ length: maxGuess }, generateLine));
    setGameEnded(false);
    generateWord();
  }, [generateWord, maxGuess]);

  const setMessage = useCallback(
    (message: string) => {
      setToast(message, 3000);
    },
    [setToast]
  );

  const addCharToCurrentLine = useCallback(
    (char: string): boolean => {
      if (currentLineCharacterIndex >= 5) return false;
      const character: ICharacter = generateCharacter(char);
      setLines((oldLines) => {
        const newLines = [...oldLines];
        const newLineChars = [...newLines[currentLineIndex].characters];
        newLineChars[currentLineCharacterIndex] = character;
        newLines[currentLineIndex].characters = newLineChars;
        return newLines;
      });
      return true;
    },
    [currentLineIndex, currentLineCharacterIndex]
  );

  const removeLastCharFromCurrentLine = useCallback((): boolean => {
    if (currentLineCharacterIndex <= 0) return false;
    const lineChar: ICharacter = generateCharacter();
    setLines((oldLines) => {
      const newLines = [...oldLines];
      const newLineChars = [...newLines[currentLineIndex].characters];
      newLineChars[currentLineCharacterIndex - 1] = lineChar;
      newLines[currentLineIndex].characters = newLineChars;
      return newLines;
    });
    return true;
  }, [currentLineIndex, currentLineCharacterIndex]);

  const evaluateAndUpdateCurrentLine = useCallback((): boolean => {
    if (currentLineCharacterIndex < 5) {
      setIsInvalidLine(true);
      setMessage("Guesses must be 5 characters!");
      return false;
    }
    const validatedLine = getValidatedLine(lines[currentLineIndex], word);
    setLines((oldLines) => {
      const newLines = [...oldLines];
      newLines[currentLineIndex] = validatedLine;
      return newLines;
    });
    const currentWord = validatedLine.characters.reduce((acc, x) => acc + x.character, "");
    if (currentWord.toLowerCase() === word.toLowerCase()) {
      setMessage("You Win!");
      setGameEnded(true);
    } else if (currentLineIndex >= maxGuess - 1) {
      setMessage("You Lose");
      setGameEnded(true);
    } else {
      setCurrentLineIndex((oldIndex) => oldIndex + 1);
      setCurrentLineCharacterIndex(0);
    }
    return true;
  }, [currentLineIndex, word, currentLineCharacterIndex, maxGuess, setMessage, lines]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (/backspace/i.test(event.key)) {
        if (removeLastCharFromCurrentLine()) setCurrentLineCharacterIndex((oldIndex) => oldIndex - 1);
      } else if (/enter/i.test(event.key)) {
        evaluateAndUpdateCurrentLine();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        if (addCharToCurrentLine(event.key)) setCurrentLineCharacterIndex((oldIndex) => oldIndex + 1);
      }
    },
    [addCharToCurrentLine, removeLastCharFromCurrentLine, evaluateAndUpdateCurrentLine]
  );

  const providerValue: IWordleContextProps = useMemo(
    () => ({
      lines,
      currentLineCharacterIndex,
      currentLineIndex,
      isInvalidLine,
      setIsInvalidLine,
      setMessage,
      gameEnded,
      resetGame,
    }),
    [lines, currentLineCharacterIndex, currentLineIndex, isInvalidLine, setMessage, gameEnded, resetGame]
  );

  useEffect(() => {
    if (gameEnded) window.removeEventListener("keyup", handleKeyPress);
    else window.addEventListener("keyup", handleKeyPress);
    return () => window.removeEventListener("keyup", handleKeyPress);
  }, [handleKeyPress, gameEnded]);

  return (
    <>
      <WordleContext.Provider value={providerValue}>{children}</WordleContext.Provider>
      <Message open={open} message={message} />
    </>
  );
};

export default WordleContext;
