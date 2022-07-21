import { ECharMatch, ILine, ICharacter } from "../types";

export const generateCharacter = (character = "", match: ECharMatch = ECharMatch.NA): ICharacter => {
  return { character, match };
};

export const generateLine = (lineString = ""): ILine => {
  const line: ILine = {
    characters: [],
  };
  for (let i = 0; i < 5; i++) {
    line.characters.push(generateCharacter(lineString[i]));
  }
  return line;
};

export const getValidatedLine = (line: ILine, word: string): ILine => {
  const validatedLine: ILine = JSON.parse(JSON.stringify(line));
  validatedLine.characters.forEach((lineChar, i) => {
    if (lineChar.character.length === 0) lineChar.match = ECharMatch.NA;
    else if (word[i].toLowerCase() === lineChar.character.toLowerCase()) lineChar.match = ECharMatch.FULL;
    else if (word.toLowerCase().includes(lineChar.character.toLowerCase())) lineChar.match = ECharMatch.PARTIAL;
    else lineChar.match = ECharMatch.NONE;
  });
  return validatedLine;
};
