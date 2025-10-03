"use client";

import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import IconButton from "@/components/button/icon-button";
import useThemeContext from "@/hooks/use-theme-context";

export default function ToggleTheme() {
  const { darkTheme, toggleTheme } = useThemeContext();
  return (
    <IconButton label="toggle dark theme" onClick={toggleTheme}>
      {darkTheme ? (
        <MdOutlineLightMode className="text-3xl text-gray-500 dark:text-blue-400" />
      ) : (
        <MdDarkMode className="text-3xl text-gray-500 dark:text-blue-400" />
      )}
    </IconButton>
  );
}
