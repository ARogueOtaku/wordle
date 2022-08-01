import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { EColorTheme } from "../types";

interface IThemeContextProps {
  theme: string;
  switchColorTheme: () => void;
}

const ThemeContext = createContext<IThemeContextProps>({} as IThemeContextProps);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<EColorTheme>(EColorTheme.DARK);

  const switchColorTheme = useCallback(
    () =>
      setTheme((oldTheme) => {
        return oldTheme === EColorTheme.LIGHT ? EColorTheme.DARK : EColorTheme.LIGHT;
      }),
    []
  );

  const providerValue: IThemeContextProps = useMemo(
    () => ({
      theme,
      switchColorTheme,
    }),
    [theme, switchColorTheme]
  );

  return (
    <>
      <ThemeContext.Provider value={providerValue}>{children}</ThemeContext.Provider>
    </>
  );
};

export default ThemeContext;
