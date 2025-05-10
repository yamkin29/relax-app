'use client'
import React, { useState } from "react";
import Header from "@/components/Header";
import VideoGrid from "@/components/videoGrid/VideoGrid";
import Channels from "@/components/Channels";

type Tab = 'videos' | 'channels';

const HomePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('videos');

    return (
        <div className="bg-teal-800 min-h-screen text-white">
            <Header activeTab={activeTab} onTabChange={setActiveTab} />

            <h1 className="text-3xl font-bold text-center mt-10">
                {activeTab === 'videos'
                    ? 'Ambient Background Videos'
                    : activeTab === 'channels'
                        ? 'Channels'
                        : 'Other Content'}
            </h1>

            <div className="p-4">
                {activeTab === 'videos' && <VideoGrid />}
                {activeTab === 'channels' && <Channels />}
            </div>
        </div>
    );
}

export default HomePage;