"use client";
import { useEffect, useRef, useState } from "react";
import useAIContext from "./use-ai-context";

export default function useRecorder() {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const chunks = useRef<Blob[]>([]);
  const { setRecordedVideoChunks } = useAIContext();

  // Silence detection helpers
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  async function startRecording(onSilence?: () => void) {
    chunks.current = [];
    setRecordedVideoChunks([]);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      recorder.start();
      setRecorder(recorder);
      setRecording(true);

      // setup Web Audio API for silence detection
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
    } catch (error) {
      console.log("Error accessing media devices", error);
    }
  }
  useEffect(() => {
    if (!(analyserRef.current && recording)) return;

    const dataArray = new Uint8Array(analyserRef.current.fftSize);

    function checkSilence() {
      analyserRef.current?.getByteFrequencyData(dataArray);
      const volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      console.log(volume);

      // adjust threshold depending on noise
      if (volume < 5) {
        if (!silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            console.log("Silence detected for 2s, stopping recorder...");
            stopRecording();
          }, 2000); // 2s silence
        }
      } else {
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      }

      if (recorder && recorder.state === "recording" && recording) {
        requestAnimationFrame(checkSilence);
      }
    }

    checkSilence();
  }, [recording]);

  async function stopRecording(_recorder?: typeof recorder) {
    console.log(recorder);
    if (!_recorder) _recorder = recorder;

    if (!_recorder) return null;

    return new Promise<Blob[]>((resolve) => {
      _recorder.onstop = () => {
        _recorder.stream.getTracks().forEach((track) => track.stop());
        setRecorder(null);
        setRecording(false);

        // cleanup audio context
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        analyserRef.current = null;
        sourceRef.current = null;
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }

        resolve(chunks.current);
      };

      _recorder.stop();
    });
  }

  function getChuncks() {
    return chunks.current;
  }

  return { startRecording, stopRecording, recording, getChuncks };
}
