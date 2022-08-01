import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import WordleContext from "../../contexts/WordleContext";
import { ECharSize, EColorTheme } from "../../types";
import MoonIcon from "../icons/MoonIcon";
import RefreshIcon from "../icons/RefreshIcon";
import SunIcon from "../icons/SunIcon";
import { IActionProps } from "./Action";
import Actions from "./Actions";
import Header from "./Header";

const NavBar = ({ headerText }: { headerText: string }) => {
  const { resetGame, gameEnded } = useContext(WordleContext);
  const { switchColorTheme, theme } = useContext(ThemeContext);

  const ThemeSwticherIcon = theme === EColorTheme.LIGHT ? MoonIcon : SunIcon;

  const actions: IActionProps[] = [
    {
      icon: <ThemeSwticherIcon width={30} height={30} />,
      onClick: switchColorTheme,
    },
    {
      icon: <RefreshIcon width={30} height={30} />,
      onClick: resetGame,
      highlight: gameEnded,
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
