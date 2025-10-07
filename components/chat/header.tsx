"use client";

import { FaClosedCaptioning } from "react-icons/fa6";
import { VscSettings } from "react-icons/vsc";
import { LuCaptionsOff } from "react-icons/lu";
import IconButton from "../button/icon-button";
import Avatar from "../avatar";
import ToggleTheme from "@/utils/toggle-theme";
import HeaderTitle from "../header-title";
import useAIContext from "@/hooks/use-ai-context";
import Settings from "./settings";
import { useState } from "react";
import ComponentVisiblity from "../utils/component-visibility";

export default function ChatHeader() {
  const { captionOn, setCaptionOn } = useAIContext();
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-6 px-8 fixed top-0 w-full z-20 backdrop-blur-md shadow-sm">
      <HeaderTitle />

      <div className="flex items-center gap-5">

        <IconButton
          label="toggle caption"
          type="button"
          title="Toggle Caption"
          className="hover:text-white transition"
          onClick={() => setCaptionOn(!captionOn)}
        >
          {captionOn ? <LuCaptionsOff size={22} /> : <FaClosedCaptioning size={22} />}
        </IconButton>

        <IconButton
          label="settings"
          type="button"
          title="Settings"
          className="hover:text-white transition"
          onClick={() => setIsSettingOpen((prev) => !prev)}
        >
          <VscSettings size={25} />
        </IconButton>

        <ToggleTheme />
        <Avatar />
      </div>

        <ComponentVisiblity show={isSettingOpen}>
          <div
            className="fixed inset-0 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none sm:inset-auto sm:top-4 sm:right-4 sm:w-auto sm:h-auto z-30"
            onClick={() => setIsSettingOpen(false)}
            >
            <div
              className="relative sm:top-0 sm:right-0 sm:translate-x-0 sm:translate-y-0"
              onClick={(e) => e.stopPropagation()}
              >
                <Settings />
            </div>
          </div>
        </ComponentVisiblity>
    
    </header>
  );
}
