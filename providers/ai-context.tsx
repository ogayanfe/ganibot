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
  recordedVideoChunks: Blob[];
  setRecordedVideoChunks: (c: Blob[]) => unknown;
}

export const aiContext = createContext<AiContextValues>({
  audioOn: false,
  recordedVideoChunks: [],
  setRecordedVideoChunks: console.log,
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
  const [transcripts, setTranscripts] = useState("");
  const [recordedVideoChunks, setRecordedVideoChunks] = useState<Blob[]>([]);

  const value: AiContextValues = {
    audioOn,
    videoOn,
    captionOn,
    transcripts,
    setAudioOn,
    setVideoOn,
    setCaptionOn,
    recordedVideoChunks,
    setRecordedVideoChunks,
    setTranscripts,
  };

  return <aiContext.Provider value={value}>{children}</aiContext.Provider>;
}
