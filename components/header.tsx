"use client";

import ToggleTheme from "@/contexts/theme-context";
import IconLink from "./utils/icon-link";
import { FaGithub } from "react-icons/fa6";
import { PROJECT_GITHUB_URL } from "@/utils/constants";
import { signIn, signOut } from "next-auth/react";
import useAuthenticatedSession from "@/hooks/utils/use-authenticated";
import ComponentVisiblity from "./utils/component-visibility";
import { CiLogin } from "react-icons/ci";
import { Pixelify_Sans } from "next/font/google";
import { MdOutlinePanoramaPhotosphereSelect } from "react-icons/md";
import HeaderButton from "./button/header-button";
import Avatar from "./avatar";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // pick weights you need
});

export default function Header() {
  const authenticated = useAuthenticatedSession();

  return (
    <header className={`flex w-full items-center justify-between p-4 sm:p-8 px-4 md:px-12`}>
      <h1
        className={`text-slate-700 dark:text-green-600 uppercase text-2xl sm:text-4xl flex items-center justify-center gap-3 ${pixelify.className}`}
      >
        {<MdOutlinePanoramaPhotosphereSelect />}
        Gani
      </h1>
      <div className="flex gap-3 sm:gap-6 items-center justify-between">
        <ComponentVisiblity show={!authenticated}>
          <HeaderButton title="signin" icon={<CiLogin className="text-xl sm:text-2xl" onClick={() => signIn()} />} />
        </ComponentVisiblity>
        <ComponentVisiblity show={authenticated}>
          <HeaderButton title="signout" icon={<CiLogin className="text-xl sm:text-2xl" onClick={() => signOut()} />} />
        </ComponentVisiblity>
        <ToggleTheme />
        <IconLink href={PROJECT_GITHUB_URL} target="_blank" label="view project on github">
          <FaGithub />
        </IconLink>
        <Avatar />
      </div>
    </header>
  );
}
