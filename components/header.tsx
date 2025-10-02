"use client";

import ToggleTheme from "@/contexts/theme-context";
import IconLink from "./utils/icon-link";
import { FaGithub } from "react-icons/fa6";
import { PROJECT_GITHUB_URL } from "@/utils/constants";
import { signIn } from "next-auth/react";
import useAuthenticatedSession from "@/hooks/utils/use-authenticated";
import ComponentVisiblity from "./utils/component-visibility";
import { CiLogin } from "react-icons/ci";
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // pick weights you need
});

export default function Header() {
  const authenticated = useAuthenticatedSession();

  return (
    <header className={`flex w-full items-center justify-between p-8 px-12`}>
      <h1 className={`text-green-600 dark:text-green-200 uppercase text-3xl ${pixelify.className}`}>GaniBot</h1>
      <div className="flex gap-6 items-center justify-between">
        <ToggleTheme />
        <IconLink href={PROJECT_GITHUB_URL} target="_blank" label="view project on github">
          <FaGithub />
        </IconLink>
        <ComponentVisiblity show={!authenticated}>
          <button onClick={() => signIn()} className="p-2 px-5 text-xl text-blue-50 flex items-center justify-center gap-3 bg-blue-400 shadow-xl">
            signin
            <CiLogin className="text-2sl" />
          </button>
        </ComponentVisiblity>
      </div>
    </header>
  );
}
