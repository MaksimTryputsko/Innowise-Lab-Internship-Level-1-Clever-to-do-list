import { DARK_THEME, LIGHT_THEME, attribute } from "constants/valuesTheme";

export const handleClick = () => {
  const newTheme =
    document.documentElement.getAttribute(attribute) === LIGHT_THEME
      ? DARK_THEME
      : LIGHT_THEME;
  document.documentElement.setAttribute(attribute, newTheme);
  localStorage.setItem(attribute, newTheme);
};
