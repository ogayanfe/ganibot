"use client";

import ComponentVisiblity from "@/components/utils/component-visibility";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div>
      <ComponentVisiblity show={!!session}>
        <button onClick={() => signOut()}>Log out</button>
      </ComponentVisiblity>
      <ComponentVisiblity show={!session}>
        <button onClick={() => signIn()}>Log in</button>
      </ComponentVisiblity>
    </div>
  );
}
