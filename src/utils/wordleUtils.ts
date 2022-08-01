import { ECharMatch, IWord, ICharacter, ECharSize } from "../types";

export const generateCharacter = (character = "", match: ECharMatch = ECharMatch.NA): ICharacter => {
  return { character, match };
};

export const generateWord = (wordString = ""): IWord => {
  const word: IWord = {
    characters: [],
  };
  const wordLength = wordString.length ? wordString.length : 5;
  for (let i = 0; i < wordLength; i++) {
    word.characters.push(generateCharacter(wordString[i]));
  }
  return word;
};

export const getValidatedWord = (word: IWord, correctWord: string): IWord => {
  const validatedWord: IWord = JSON.parse(JSON.stringify(word));
  validatedWord.characters.forEach((wordChar, i) => {
    if (wordChar.character.length === 0) wordChar.match = ECharMatch.NA;
    else if (correctWord[i]?.toLowerCase() === wordChar.character.toLowerCase()) wordChar.match = ECharMatch.FULL;
    else if (correctWord.toLowerCase().includes(wordChar.character.toLowerCase())) wordChar.match = ECharMatch.PARTIAL;
    else wordChar.match = ECharMatch.NONE;
  });
  return validatedWord;
};
