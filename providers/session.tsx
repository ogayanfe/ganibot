"use client";

import { SessionProvider } from "next-auth/react";

interface IProps {
  children: React.ReactNode;
}
export default function GaniSessionProvider({ children }: IProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
