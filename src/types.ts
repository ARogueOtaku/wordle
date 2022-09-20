export enum ECharMatch {
  FULL = 4,
  PARTIAL = 3,
  NONE = 2,
  NA = 1,
  OTHER = 0,
}

export enum EDifficulty {
  EASY,
  NORMAL,
  HARD,
}

export enum ECharSize {
  XSMALL,
  SMALL,
  MEDIUM,
  LARGE,
  XLARGE,
}

export enum EColorTheme {
  LIGHT = "light",
  DARK = "dark",
}

export interface ICharacter {
  character: string;
  match: ECharMatch;
}

export interface IWord {
  characters: ICharacter[];
}
