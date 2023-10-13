import React, {
  Context,
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import styles from "./themeProvider.module.scss";
import classNames from "classnames";
import {
  DARK_THEME,
  KEY_THEME_LOCALSTORAGE,
  LIGHT_THEME,
} from "constants/valuesTheme";

export const ThemeContext = createContext<
  (string | Dispatch<SetStateAction<string>>)[] | null
>(null);

interface IPropsThemeProvider {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: IPropsThemeProvider) => {
  const [theme, setTheme] = useState("");

  const classes = classNames(styles.default, {
    [styles.light]: theme === LIGHT_THEME,
    [styles.dark]: theme === DARK_THEME,
  });

  useEffect(() => {
    const attributeFromLocalStorage = localStorage.getItem(
      KEY_THEME_LOCALSTORAGE,
    );
    if (!attributeFromLocalStorage) {
      setTheme(LIGHT_THEME);
    } else {
      setTheme(attributeFromLocalStorage);
    }
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <div className={classes}>{children}</div>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
