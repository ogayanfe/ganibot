'use client'

import SplineChart from '@/components/chart/spline';
import React from 'react';
import { CiVideoOn } from 'react-icons/ci';
import { FaClosedCaptioning } from 'react-icons/fa6';
import { ImCancelCircle } from 'react-icons/im';
import { LuAudioLines } from 'react-icons/lu';
import { TiMicrophone } from 'react-icons/ti';
import { VscSettings } from 'react-icons/vsc';

export default function NewChat() {
    return (
        <div className="flex flex-col h-screen w-full text-white font-sans transition-all duration-300">

            <header className="flex justify-end space-x-6 p-4 px-8 text-gray-400">
                <button type="button" title="Enable Caption" className="hover:text-white transition"><FaClosedCaptioning size={25} /></button>
                <button type="button" title="Enable Caption" className="hover:text-white transition"><LuAudioLines size={25} /></button>
                <button type="button" title="Enable Caption" className="hover:text-white transition"><VscSettings size={25}/></button>
            </header>

            <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 px-6">
                <div className="w-full">
                    <SplineChart scene={'/scene.splinecode'} />
                </div>
                <div className="rounded-2xl shadow-xl p-6 flex flex-col justify-between max-w-md w-full min-h-[250px]">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-indigo-400">Transcription</h2>
                        <p className="text-sm text-gray-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dolore quam animi aperiam amet. Voluptates, minima animi, nulla dolores odit, dolorum molestias magnam libero id totam suscipit officiis nobis voluptatem.
                        </p>
                        <div className="bg-gray-800 p-3 rounded-lg font-mono text-center text-yellow-300 text-sm break-words">
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Controls */}
            <footer className="flex justify-center items-center gap-10 py-6 border-t border-gray-800">
                {/* Video Button */}
                <button type="button" title="Enable Caption" className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition hover:shadow-lg">
                    <CiVideoOn size={25} />
                </button>

                {/* Mic Button with Pulse Effect */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute w-20 h-20 rounded-full bg-indigo-500 opacity-30 animate-ping"></span>
                    <button type="button" title="Enable Caption" className="relative p-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg hover:scale-105 transition transform">
                        <TiMicrophone size={32} />
                    </button>
                </div>

                {/* Cancel Button */}
                <button type="button" title="Enable Caption" className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition hover:shadow-lg">
                    <ImCancelCircle size={25} />
                </button>
            </footer>
        </div>
    );
}
