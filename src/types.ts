export enum ECharMatch {
  FULL,
  PARTIAL,
  NONE,
  NA,
}

export interface ICharacter {
  character: string;
  match: ECharMatch;
}

export interface ILine {
  characters: ICharacter[];
}
