"use client";
import HeaderButton from "@/components/button/header-button";
import Footer from "@/components/footer";
import ComponentVisiblity from "@/components/utils/component-visibility";
import useAuthenticatedSession from "@/hooks/utils/use-authenticated";
import { signIn } from "next-auth/react";
import { BsInfoCircle } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { LuAudioLines } from "react-icons/lu";

export default function Page() {
  const authenticated = useAuthenticatedSession();

  const buttonClassNames = "bg-purple-500 text-[.9em] text-purple-50 mt-3";

  return (
    <div className="flex w-full flex-col h-full items-center justify-between">
      <div className={`font-bold text-blue-500 text-2xl lg:text-3xl flex gap-y-3 px-1 items-center justify-center flex-grow flex-col`}>
        <p className="text-center italic">Think. Ask. Discover</p>
        <p className="text-center italic">Gani — Smarter Conversations in Hausa.</p>

        <div className="text-xl flex items-center max-sm:flex-col justify-center gap-3 px-2 mt-2">
          <ComponentVisiblity show={!authenticated}>
            <HeaderButton
              title="Sign In To Gani"
              className={`${buttonClassNames} w-[250px] sm:w-[270px]`}
              icon={<CiLogin />}
              onClick={() => signIn()}
            />
          </ComponentVisiblity>
          <ComponentVisiblity show={authenticated}>
            <HeaderButton
              title="Start Conversation"
              className={`${buttonClassNames} w-[250px] sm:w-[270px]`}
              icon={<LuAudioLines />}
              href="/new-chat"
            />
          </ComponentVisiblity>
          <HeaderButton
            title="About Project"
            className={`${buttonClassNames} !bg-blue-500 w-[250px] sm:w-[270px]`}
            icon={<BsInfoCircle />}
            href="/about"
            iconPosition="end"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
