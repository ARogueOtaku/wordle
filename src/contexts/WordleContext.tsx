import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Message from "../components/Message";
import useToast from "../hooks/useToast";
import { generateCharacter, generateWord, getValidatedWord } from "../utils/wordleUtils";
import { ECharMatch, ICharacter, IWord } from "../types";

interface IWordleProviderProps {
  maxGuess: number;
  word: string;
  children: ReactNode;
  fetchNewWord: () => void;
}

interface IWordleContextProps {
  words: Array<IWord>;
  currentWordIndex: number;
  currentWordCharacterIndex: number;
  isInvalidWord: boolean;
  setIsInvalidWord: Dispatch<SetStateAction<boolean>>;
  setMessage: (message: string) => void;
  gameEnded: boolean;
  resetGame: () => void;
  keyboardCharacters: Array<ICharacter>;
  handleKeyboardClick: (characterString: string) => void;
  currentKeyboardCharacter: string;
}

const WordleContext = createContext<IWordleContextProps>({} as IWordleContextProps);

const defaultKeyboardChars = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "«",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "↵",
].map((char) => generateCharacter(char, ECharMatch.OTHER));

export const WordleProvider = ({ maxGuess, word, children, fetchNewWord }: IWordleProviderProps) => {
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentWordCharacterIndex, setCurrentWordCharacterIndex] = useState<number>(0);
  const validatedWordRef = useRef<IWord>({} as IWord);
  const [isInvalidWord, setIsInvalidWord] = useState<boolean>(false);
  const [words, setWords] = useState<Array<IWord>>(Array.from({ length: maxGuess }, generateWord));
  const { open, message, setToast } = useToast();
  const [currentKeyboardCharacter, setCurrentKeyboardCharacter] = useState<string>("");
  const [keyboardCharacters, setKeyboardCharacters] = useState<Array<ICharacter>>(defaultKeyboardChars);
  const characterClearTimeoutRef = useRef<number>(-1);

  const preventFunnyBusiness = useCallback((event: KeyboardEvent) => event.preventDefault(), []);

  //======================Keyboard Logic==============================
  const updateKeyboard = useCallback(() => {
    setKeyboardCharacters((oldCharacters) => {
      const characterMatchObj: { [key: string]: ECharMatch } = {};
      validatedWordRef.current.characters.forEach((character) => {
        if (
          typeof characterMatchObj[character.character] === "undefined" ||
          characterMatchObj[character.character] < character.match
        )
          characterMatchObj[character.character] = character.match;
      });
      return oldCharacters.map((character) => {
        if (characterMatchObj[character.character] > character.match)
          return generateCharacter(character.character, characterMatchObj[character.character]);
        return character;
      });
    });
  }, []);

  const handleKeyboardClick = useCallback((character: string) => {
    let char = character;
    switch (char) {
      case "↵":
        char = "enter";
        break;
      case "«":
        char = "backspace";
        break;
      default:
        break;
    }
    document.dispatchEvent(new KeyboardEvent("keyup", { key: char }));
  }, []);

  const handleKeyboardKeyPress = useCallback(
    (event: KeyboardEvent, triggerUpdate: boolean) => {
      if (characterClearTimeoutRef.current > -1) window.clearTimeout(characterClearTimeoutRef.current);
      let char = event.key.toLowerCase();
      switch (char) {
        case "enter":
          char = "↵";
          break;
        case "backspace":
          char = "«";
          break;
        default:
          break;
      }
      setCurrentKeyboardCharacter(char);
      characterClearTimeoutRef.current = window.setTimeout(() => {
        setCurrentKeyboardCharacter("");
        characterClearTimeoutRef.current = -1;
      }, 100);
      if (/enter/i.test(event.key) && triggerUpdate) updateKeyboard();
    },
    [updateKeyboard]
  );
  //==================================================================

  //=========================Grid Logic===============================
  const resetGame = useCallback(() => {
    console.log("Resetting");
    setCurrentWordIndex(0);
    setCurrentWordCharacterIndex(0);
    setWords(Array.from({ length: maxGuess }, generateWord));
    setGameEnded(false);
    setKeyboardCharacters(defaultKeyboardChars);
    fetchNewWord();
  }, [fetchNewWord, maxGuess]);

  const setMessage = useCallback(
    (message: string) => {
      setToast(message, 3000);
    },
    [setToast]
  );

  const addCharToCurrentWord = useCallback(
    (char: string): boolean => {
      if (currentWordCharacterIndex >= 5) return false;
      const character: ICharacter = generateCharacter(char);
      setWords((oldWords) => {
        const newWords = [...oldWords];
        const newWordChars = [...newWords[currentWordIndex].characters];
        newWordChars[currentWordCharacterIndex] = character;
        newWords[currentWordIndex].characters = newWordChars;
        return newWords;
      });
      return true;
    },
    [currentWordIndex, currentWordCharacterIndex]
  );

  const removeLastCharFromCurrentWord = useCallback((): boolean => {
    if (currentWordCharacterIndex <= 0) return false;
    const wordChar: ICharacter = generateCharacter();
    setWords((oldWords) => {
      const newWords = [...oldWords];
      const newWordChars = [...newWords[currentWordIndex].characters];
      newWordChars[currentWordCharacterIndex - 1] = wordChar;
      newWords[currentWordIndex].characters = newWordChars;
      return newWords;
    });
    return true;
  }, [currentWordIndex, currentWordCharacterIndex]);

  const updateCurrentWord = useCallback((): boolean => {
    if (currentWordCharacterIndex < 5) {
      setIsInvalidWord(true);
      setMessage("Guesses must be 5 characters!");
      return false;
    }
    setWords((oldWords) => {
      const newWords = [...oldWords];
      newWords[currentWordIndex] = validatedWordRef.current;
      return newWords;
    });
    const currentWord = validatedWordRef.current.characters.reduce((acc, x) => acc + x.character, "");
    if (currentWord.toLowerCase() === word.toLowerCase()) {
      setMessage("You Win!");
      setGameEnded(true);
    } else if (currentWordIndex >= maxGuess - 1) {
      setMessage("You Lose");
      setGameEnded(true);
    } else {
      setCurrentWordIndex((oldIndex) => oldIndex + 1);
      setCurrentWordCharacterIndex(0);
    }
    return true;
  }, [currentWordIndex, word, currentWordCharacterIndex, maxGuess, setMessage]);

  const handleGridKeyPress = useCallback(
    (event: KeyboardEvent): boolean => {
      if (/backspace/i.test(event.key)) {
        if (removeLastCharFromCurrentWord()) setCurrentWordCharacterIndex((oldIndex) => oldIndex - 1);
      } else if (/enter/i.test(event.key)) {
        return updateCurrentWord();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        if (addCharToCurrentWord(event.key)) setCurrentWordCharacterIndex((oldIndex) => oldIndex + 1);
      }
      return true;
    },
    [addCharToCurrentWord, removeLastCharFromCurrentWord, updateCurrentWord]
  );
  //==================================================================

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      validatedWordRef.current = getValidatedWord(words[currentWordIndex], word);
      const triggerKeyboardUpdate = handleGridKeyPress(event);
      handleKeyboardKeyPress(event, triggerKeyboardUpdate);
    },
    [handleGridKeyPress, handleKeyboardKeyPress, currentWordIndex, word, words]
  );

  const providerValue: IWordleContextProps = useMemo(
    () => ({
      words,
      currentWordCharacterIndex,
      currentWordIndex,
      isInvalidWord,
      setIsInvalidWord,
      setMessage,
      gameEnded,
      resetGame,
      keyboardCharacters,
      currentKeyboardCharacter,
      handleKeyboardClick,
    }),
    [
      words,
      currentWordCharacterIndex,
      currentWordIndex,
      isInvalidWord,
      setMessage,
      gameEnded,
      resetGame,
      keyboardCharacters,
      currentKeyboardCharacter,
      handleKeyboardClick,
    ]
  );

  useEffect(() => {
    if (gameEnded) document.removeEventListener("keyup", handleKeyPress);
    else document.addEventListener("keyup", handleKeyPress);
    document.addEventListener("keypress", preventFunnyBusiness);
    document.addEventListener("keyup", preventFunnyBusiness);
    document.addEventListener("keydown", preventFunnyBusiness);
    return () => {
      document.removeEventListener("keypress", preventFunnyBusiness);
      document.removeEventListener("keyup", preventFunnyBusiness);
      document.removeEventListener("keydown", preventFunnyBusiness);
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleKeyPress, preventFunnyBusiness, gameEnded]);

  return (
    <>
      <WordleContext.Provider value={providerValue}>{children}</WordleContext.Provider>
      <Message open={open} message={message} />
    </>
  );
};

export default WordleContext;
