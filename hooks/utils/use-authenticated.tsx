"use client";

import { useSession } from "next-auth/react";

export default function useAuthenticatedSession(): boolean {
  const { data } = useSession();
  return !!data;
}
