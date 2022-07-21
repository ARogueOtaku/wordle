import { ILine } from "../types";
import Character from "./Character";

const Line = ({
  line,
  isCurrent,
  currentLineCharacterIndex,
  isInvalid,
  onInvalid,
}: {
  line: ILine;
  isCurrent: boolean;
  currentLineCharacterIndex: number;
  isInvalid: boolean;
  onInvalid: () => void;
}) => {
  return (
    <div
      className={`line${isInvalid ? " invalid" : ""}`}
      onAnimationEnd={(event) => {
        if (event.animationName === "shake") onInvalid();
      }}
    >
      {line.characters.map((character, i) => {
        return <Character key={i} character={character} wasTyped={currentLineCharacterIndex - 1 >= i && isCurrent} />;
      })}
    </div>
  );
};

export default Line;
