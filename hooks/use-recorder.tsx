"use client";
import { useRef, useState } from "react";

export default function useRecorder() {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const chunks = useRef<Blob[]>([]);

  // Silence detection helpers
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  async function startRecording(onSilence?: () => void) {
    chunks.current = [];
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

      const dataArray = new Uint8Array(analyserRef.current.fftSize);

      function checkSilence() {
        return;
        analyserRef.current?.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        // adjust threshold depending on noise
        if (volume < 5) {
          if (!silenceTimerRef.current) {
            silenceTimerRef.current = setTimeout(() => {
              console.log("Silence detected for 2s, stopping recorder...");
              stopRecording().then(() => {
                if (onSilence) onSilence();
              });
            }, 2000); // 2s silence
          }
        } else {
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
        }

        if (recorder.state === "recording") {
          requestAnimationFrame(checkSilence);
        }
      }

      checkSilence();
    } catch (error) {
      console.log("Error accessing media devices", error);
    }
  }

  async function stopRecording() {
    if (!recorder) return null;

    return new Promise<Blob[]>((resolve) => {
      recorder.onstop = () => {
        recorder.stream.getTracks().forEach((track) => track.stop());
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

      recorder.stop();
    });
  }

  function getChuncks() {
    return chunks.current;
  }

  return { startRecording, stopRecording, recording, getChuncks };
}
