import { useContext } from "react";
import WordleContext from "../contexts/WordleContext";
import Line from "./Line";

const Grid = () => {
  const { lines, currentLineIndex, currentLineCharacterIndex, isInvalidLine, setIsInvalidLine, gameEnded } =
    useContext(WordleContext);
  return (
    <>
      <div className="wordlegrid" data-testid="app">
        {lines.map((line, i) => (
          <Line
            key={i}
            line={line}
            isCurrent={i === currentLineIndex && !gameEnded}
            currentLineCharacterIndex={currentLineCharacterIndex}
            isInvalid={isInvalidLine && i === currentLineIndex}
            onInvalid={() => {
              setIsInvalidLine(false);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Grid;
