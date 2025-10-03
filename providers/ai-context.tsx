"use client";

import { createContext, useState } from "react";

interface AiContextValues {
  audioOn: boolean;
  videoOn: boolean;
  captionOn: boolean;
  setAudioOn: (on: boolean) => unknown;
  setVideoOn: (on: boolean) => unknown;
  setCaptionOn: (on: boolean) => unknown;
}

export const aiContext = createContext<AiContextValues>({
  audioOn: false,
  videoOn: false,
  captionOn: false,
  setAudioOn: console.log,
  setVideoOn: console.log,
  setCaptionOn: console.log,
});

interface IProps {
  children: React.ReactNode;
}

export default function AiContextProvider({ children }: IProps) {
  const [audioOn, setAudioOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [captionOn, setCaptionOn] = useState(false);

  const value: AiContextValues = {
    audioOn,
    videoOn,
    captionOn,
    setAudioOn,
    setVideoOn,
    setCaptionOn,
  };

  return <aiContext.Provider value={value}>{children}</aiContext.Provider>;
}
