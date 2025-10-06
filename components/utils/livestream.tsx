'use client';

import React, { useRef, useState } from 'react';
import { FiCamera, FiStopCircle, FiDownload } from 'react-icons/fi';

export default function LiveStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Start the camera and recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setRecordedChunks(chunks);
        setIsRecording(false);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err: any) {
      alert('Camera access failed: ' + err.message);
    }
  };

  // Stop the recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Live Recording</h1>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full max-w-md rounded-2xl shadow-md border dark:border-gray-300 border-black"
      />

      <div className="flex gap-4 mt-6">
        {!isRecording ? (
          <button 
            type='button'
            title='Start Recorder'
            onClick={startRecording}
            className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-xl hover:bg-green-700 transition-all cursor-pointer"
          >
            <FiCamera /> Start Recording
          </button>
        ) : (
          <button
          type='button'
          title='Stop recorder'
            onClick={stopRecording}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-all"
          >
            <FiStopCircle /> Stop Recording
          </button>
        )}
      </div>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="recording.webm"
          className="flex items-center gap-2 mt-6 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
        >
          <FiDownload /> Download Video
        </a>
      )}
    </main>
  );
}
