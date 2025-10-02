"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  return (
    <div className="flex w-full h-full items-center flex-center">
      <button>Sign In</button>
    </div>
  );
}
