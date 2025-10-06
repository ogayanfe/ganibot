"use client";

import { createContext, useState } from "react";

interface AiContextValues {
  audioOn: boolean;
  videoOn: boolean;
  captionOn: boolean;
  transcripts: string;
  setTranscripts: (text: string) => unknown;
  setAudioOn: (on: boolean) => unknown;
  setVideoOn: (on: boolean) => unknown;
  setCaptionOn: (on: boolean) => unknown;
}

export const aiContext = createContext<AiContextValues>({
  audioOn: false,
  videoOn: false,
  captionOn: false,
  transcripts: "",
  setAudioOn: console.log,
  setVideoOn: console.log,
  setCaptionOn: console.log,
  setTranscripts: console.log,
});

interface IProps {
  children: React.ReactNode;
}

export default function AiContextProvider({ children }: IProps) {
  const [audioOn, setAudioOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [captionOn, setCaptionOn] = useState(false);
  const [transcripts, setTranscripts] = useState("Thr eoanoy asoudfnastdo fasoduf asdbjh iut gasydhfi agsdjfg ashdfuasd fi");

  const value: AiContextValues = {
    audioOn,
    videoOn,
    captionOn,
    transcripts,
    setAudioOn,
    setVideoOn,
    setCaptionOn,
    setTranscripts,
  };

  return <aiContext.Provider value={value}>{children}</aiContext.Provider>;
}
