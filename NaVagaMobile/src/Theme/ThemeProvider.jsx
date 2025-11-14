import { createContext } from "react";
import { Text } from "react-native";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  return (
    <>
      {children}
    </>
  );
}
