import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import WordleContext from "../../contexts/WordleContext";
import { ECharSize, EColorTheme, EDifficulty } from "../../types";
import ChildIcon from "../icons/ChildIcon";
import MoonIcon from "../icons/MoonIcon";
import RefreshIcon from "../icons/RefreshIcon";
import SadIcon from "../icons/SadIcon";
import SmileIcon from "../icons/SmileIcon";
import SunIcon from "../icons/SunIcon";
import { IActionProps } from "./Action";
import Actions from "./Actions";
import Header from "./Header";

const NavBar = ({ headerText }: { headerText: string }) => {
  const { resetGame, gameEnded, difficulty, toggleGameDifficulty } = useContext(WordleContext);
  const { switchColorTheme, theme } = useContext(ThemeContext);

  const ThemeSwticherIcon = theme === EColorTheme.LIGHT ? MoonIcon : SunIcon;
  const DifficultyIcon =
    difficulty === EDifficulty.EASY ? ChildIcon : difficulty === EDifficulty.NORMAL ? SmileIcon : SadIcon;

  const actions: IActionProps[] = [
    {
      icon: <DifficultyIcon width={30} height={30} />,
      onClick: toggleGameDifficulty,
      title:
        difficulty === EDifficulty.EASY
          ? "Switch to Normal"
          : difficulty === EDifficulty.NORMAL
          ? "Switch to Hard"
          : "Switch to Easy",
    },
    {
      icon: <ThemeSwticherIcon width={30} height={30} />,
      onClick: switchColorTheme,
      title: theme === EColorTheme.LIGHT ? "Switch to Dark" : "Switch to Light",
    },
    {
      icon: <RefreshIcon width={30} height={30} />,
      onClick: resetGame,
      highlight: gameEnded,
      title: "Refresh Game",
    },
  ];
  return (
    <div className="navbar">
      <Header text={headerText} verifyText="flodbk" size={ECharSize.XSMALL} />
      <Actions actions={actions} />
    </div>
  );
};

export default NavBar;
