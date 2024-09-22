import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { ThemeContextState } from "../context/ThemeContext";

export const useTheme = (): ThemeContextState => {
  const context: ThemeContextState = useContext(ThemeContext)
  if (!context) {
    throw Error("useTheme must be used within a theme provider!");
  }
  return context;
}