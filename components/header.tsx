"use client";

import ToggleTheme from "@/utils/toggle-theme";
import IconLink from "./utils/icon-link";
import { FaGithub } from "react-icons/fa6";
import { PROJECT_GITHUB_URL } from "@/utils/constants";
import { signIn, signOut } from "next-auth/react";
import useAuthenticatedSession from "@/hooks/utils/use-authenticated";
import ComponentVisiblity from "./utils/component-visibility";
import { CiLogin, CiLogout } from "react-icons/ci";
import HeaderButton from "./button/header-button";
import Avatar from "./avatar";
import IconButton from "./button/icon-button";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import HeaderTitle from "./header-title";

export default function Header() {
  const authenticated = useAuthenticatedSession();

  return (
    <header 
    className={`
      flex w-full items-center justify-between 
      p-6 md:px-12
      backdrop-blur-md border-b border-gray-200 dark:border-gray-800
      transition-colors duration-300
      `}
    >

      <HeaderTitle />

      <div className="flex gap-3 sm:gap-6 items-center justify-between">
        {/* Authentication Buttons for Desktop */}
        <ComponentVisiblity show={!authenticated}>
          <HeaderButton
            title="Sign In"
            className="bg-blue-500 text-blue-50 max-sm:hidden hover:bg-blue-600 transition"
            icon={<CiLogin className="text-xl" />}
            onClick={() => signIn()}
          />
        </ComponentVisiblity>

        <ComponentVisiblity show={authenticated}>
          <HeaderButton
            title="Sign Out"
            className="bg-blue-500 text-blue-50 max-sm:hidden hover:bg-blue-600 transition"
            icon={<CiLogout className="text-xl" />}
            onClick={() => signOut()}
          />
        </ComponentVisiblity>

        <ToggleTheme />

        <IconLink 
          href={PROJECT_GITHUB_URL} 
          target="_blank"
          label="view project on github"
          className="transition-all"
        >
          <FaGithub />
        </IconLink>

        <Avatar />

        <IconButton 
          className="text-2xl sm:hidden" 
          label={authenticated ? "Sign Out" : "Sign In"}
        >
          {authenticated ? <FiLogOut /> : <FiLogIn />}
        </IconButton>
      </div>
    </header>
  );
}
