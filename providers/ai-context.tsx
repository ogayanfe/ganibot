"use client";

import { createContext, useEffect, useState } from "react";

interface AiContextValues {
  audioOn: boolean;
  videoOn: boolean;
  selectedVoice: "Male" | "Female";
  language: "Hausa" | "English";
  captionOn: boolean;
  pauseTime: number;
  transcripts: string;
  setTranscripts: (text: string) => unknown;
  setAudioOn: (on: boolean) => unknown;
  setSelectedVoice: (v: "Male" | "Female") => unknown;
  setLanguage: (l: "English" | "Hausa") => unknown;
  setPauseTime: (t: number) => unknown;
  setVideoOn: (on: boolean) => unknown;
  setCaptionOn: (on: boolean) => unknown;
  recordedVideoChunks: Blob[];
  setRecordedVideoChunks: (c: Blob[]) => unknown;
}

export const aiContext = createContext<AiContextValues>({
  audioOn: false,
  selectedVoice: "Male",
  language: "Hausa",
  pauseTime: 2,
  recordedVideoChunks: [],
  setRecordedVideoChunks: console.log,
  videoOn: false,
  captionOn: false,
  transcripts: "",
  setPauseTime: console.log,
  setLanguage: console.log,
  setSelectedVoice: console.log,
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
  const [selectedVoice, setSelectedVoice] = useState<"Male" | "Female">("Male");
  const [language, setLanguage] = useState<"Hausa" | "English">("Hausa");
  const [pauseTime, setPauseTime] = useState<number>(2);
  const [recordedVideoChunks, setRecordedVideoChunks] = useState<Blob[]>([]);

  useEffect(() => {
    setSelectedVoice((localStorage.getItem("selectedVoice") as "Male" | "Female" | null) ?? "Male");
    setLanguage((localStorage.getItem("language") as "English" | "Hausa" | null) ?? "Hausa");
    setPauseTime(parseInt(localStorage.getItem("pauseTime") ?? "2"));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedVoice", selectedVoice);
  }, [selectedVoice]);
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  useEffect(() => {
    localStorage.setItem("pauseTime", pauseTime.toString());
  }, [pauseTime]);

  const value: AiContextValues = {
    audioOn,
    selectedVoice,
    pauseTime,
    language,
    videoOn,
    captionOn,
    transcripts,
    setAudioOn,
    setVideoOn,
    setCaptionOn,
    recordedVideoChunks,
    setRecordedVideoChunks,
    setTranscripts,
    setSelectedVoice,
    setLanguage,
    setPauseTime,
  };

  return <aiContext.Provider value={value}>{children}</aiContext.Provider>;
}
