import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./themeProvider.module.scss";
import classNames from "classnames";
import {
  DARK_THEME,
  KEY_THEME_LOCALSTORAGE,
  LIGHT_THEME,
} from "constants/valuesTheme";

export interface IThemeContext {
  changeTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);

export const useThemeContext = () =>
  useContext<IThemeContext | null>(ThemeContext);

interface IPropsThemeProvider {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: IPropsThemeProvider) => {
  const [theme, setTheme] = useState("");

  const classes = classNames(styles.default, {
    [styles.light]: theme === LIGHT_THEME,
    [styles.dark]: theme === DARK_THEME,
  });

  const changeTheme = () => {
    setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
    localStorage.setItem(
      KEY_THEME_LOCALSTORAGE,
      theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME,
    );
  };

  useEffect(() => {
    const attributeFromLocalStorage = localStorage.getItem(
      KEY_THEME_LOCALSTORAGE,
    );

    if (!attributeFromLocalStorage) {
      return setTheme(LIGHT_THEME);
    }
    return setTheme(attributeFromLocalStorage);
  }, []);

  return (
    <ThemeContext.Provider value={{ changeTheme }}>
      <div className={classes}>{children}</div>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
