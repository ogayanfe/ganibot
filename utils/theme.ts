"use client";

export function setTheme(darkTheme: boolean) {
  if (darkTheme) {
    localStorage.setItem("dark", "true");
    return;
  }
  localStorage.removeItem("dark");
}

export function isDarkTheme(): boolean {
  try {
    return !!localStorage.getItem("dark");
  } catch (error) {
    return false;
  }
}
