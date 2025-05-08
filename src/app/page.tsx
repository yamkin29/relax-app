// app/page.tsx
'use client'
import React, { useState } from "react";
import Header from "@/components/Header";
import VideoGrid from "@/components/VideoGrid";
import Music from "@/components/Music";

type Tab = 'videos' | 'music' | 'other';

export default function HomePage() {
    const [activeTab, setActiveTab] = useState<Tab>('videos');

    return (
        <div className="bg-teal-800 min-h-screen text-white">
            <Header activeTab={activeTab} onTabChange={setActiveTab} />

            <h1 className="text-3xl font-bold text-center mt-10">
                {activeTab === 'videos'
                    ? 'Ambient Background Videos'
                    : activeTab === 'music'
                        ? 'Music'
                        : 'Other Content'}
            </h1>

            <div className="p-4">
                {activeTab === 'videos' && <VideoGrid />}
                {activeTab === 'music' && <Music />}
                {activeTab === 'other' && (
                    <div className="text-center mt-10 text-lg">Пока пусто...</div>
                )}
            </div>
        </div>
    );
}