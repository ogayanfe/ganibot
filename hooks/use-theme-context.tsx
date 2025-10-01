"use client";

import { themeContext } from "@/providers/theme-context";
import { use } from "react";

const useThemeContext = () => use(themeContext);

export default useThemeContext;
