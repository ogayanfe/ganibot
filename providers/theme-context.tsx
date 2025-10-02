"use client";

import { isDarkTheme, setTheme } from "@/utils/theme";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";

interface ThemContextValues {
  darkTheme: boolean;
  toggleTheme: () => void;
  setToDark: () => void;
  setToLight: () => void;
}
const themeContext = createContext<ThemContextValues>({
  darkTheme: isDarkTheme(),
  toggleTheme: console.log,
  setToDark: console.log,
  setToLight: console.log,
});

interface IProps {
  children: ReactNode;
}

function ThemeContextProvider({ children }: IProps) {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    setDarkTheme(() => isDarkTheme());
  }, []);
  
  useEffect(() => {
    const html = document.documentElement;
    setTheme(darkTheme);

    if (darkTheme) {
      html?.classList.add("dark");
      return;
    }

    html?.classList.remove("dark");
  }, [darkTheme]);

  const values: ThemContextValues = {
    darkTheme: darkTheme,
    toggleTheme: () => setDarkTheme((p) => !p),
    setToDark: () => setDarkTheme(true),
    setToLight: () => setDarkTheme(false),
  };

  return <themeContext.Provider value={values}>{children}</themeContext.Provider>;
}

export default ThemeContextProvider;

export { themeContext };
