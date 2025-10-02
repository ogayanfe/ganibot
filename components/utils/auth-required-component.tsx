"use client";

import { DEFAULT_SIGNIN_URL } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface IProps {
  redirectLocation?: string;
  children: React.ReactNode;
}

export default function AuthRequiredComponents({ redirectLocation = DEFAULT_SIGNIN_URL, children }: IProps) {
  // This component only allows authenticated users to view the component
  // It redirects all other users

  const { data: session } = useSession();
  if (!session) redirect(redirectLocation);

  return <>{children}</>;
}
