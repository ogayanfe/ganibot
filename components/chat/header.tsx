"use client";

import { FaClosedCaptioning } from "react-icons/fa6";
import { LuAudioLines } from "react-icons/lu";
import { VscSettings } from "react-icons/vsc";
import IconButton from "../button/icon-button";
import IconLink from "../utils/icon-link";
import { IoClose } from "react-icons/io5";
import Avatar from "../avatar";
import { LuCaptionsOff } from "react-icons/lu";
import ToggleTheme from "@/utils/toggle-theme";
import HeaderTitle from "../header-title";
import useAIContext from "@/hooks/use-ai-context";

export default function ChatHeader() {
  const { captionOn, setCaptionOn } = useAIContext();
  return (
    <header className="flex justify-between space-x-6 p-8 px-10 text-gray-400 top-0 fixed w-screen z-10 dark:bg-[#090909]">
      <HeaderTitle />
      {/* <IconLink href="/" label="Close">
        <IoClose className="text-4xl" />
      </IconLink> */}
      <div className="flex gap-6">
        <IconButton label="" type="button" title="Toggle Caption" className="hover:text-white transition" onClick={() => setCaptionOn(!captionOn)}>
          {captionOn ? <LuCaptionsOff size={25} /> : <FaClosedCaptioning size={25} />}
        </IconButton>
        {/* <IconButton label="" type="button" title="Enable Caption" className="hover:text-white transition">
          <LuAudioLines size={25} />
        </IconButton>
        <IconButton label="" type="button" title="Enable Caption" className="hover:text-white transition">
          <VscSettings size={25} />
        </IconButton> */}
        <ToggleTheme />
        <Avatar />
      </div>
    </header>
  );
}
