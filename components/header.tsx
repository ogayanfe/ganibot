"use client";

import ToggleTheme from "@/contexts/theme-context";
import IconLink from "./utils/icon-link";
import { FaGithub } from "react-icons/fa6";
import { PROJECT_GITHUB_URL } from "@/utils/constants";
import { signIn, signOut } from "next-auth/react";
import useAuthenticatedSession from "@/hooks/utils/use-authenticated";
import ComponentVisiblity from "./utils/component-visibility";
import { CiLogin, CiLogout } from "react-icons/ci";
import { MdOutlinePanoramaPhotosphereSelect } from "react-icons/md";
import HeaderButton from "./button/header-button";
import Avatar from "./avatar";
import IconButton from "./button/icon-button";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import HeaderTitle from "./header-title";

export default function Header() {
  const authenticated = useAuthenticatedSession();

  return (
    <header className={`flex w-full items-center justify-between p-8 px-4 md:px-12`}>
      <HeaderTitle />
      <div className="flex gap-3 sm:gap-6 items-center justify-between">
        <ComponentVisiblity show={!authenticated}>
          <HeaderButton
            title="signin"
            className="bg-blue-500 text-blue-50 max-sm:hidden"
            icon={<CiLogin className="text-xl" onClick={() => signIn()} />}
          />
        </ComponentVisiblity>
        <ComponentVisiblity show={authenticated}>
          <HeaderButton
            title="signout"
            className="bg-blue-500 text-blue-50 max-sm:hidden"
            icon={<CiLogout className="text-xl" onClick={() => signOut()} />}
          />
        </ComponentVisiblity>
        <ToggleTheme />
        <IconLink href={PROJECT_GITHUB_URL} target="_blank" label="view project on github">
          <FaGithub />
        </IconLink>
        <Avatar />
        <IconButton className="text-2xl sm:hidden" label={authenticated ? "Login" : "Logout"}>
          {authenticated ? <FiLogOut /> : <FiLogIn />}
        </IconButton>
      </div>
    </header>
  );
}
