'use client'
import React, { useState } from "react";
import Header from "@/components/Header";
import VideoGrid from "@/components/videoGrid/VideoGrid";
import Channels from "@/components/Channels";

type Tab = 'videos' | 'channels';

const PAGE_TITLES: Record<Tab, string> = {
    videos: 'Ambient Background Videos',
    channels: 'Channels'
} as const;

const HomePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('videos');

    const renderContent = () => {
        switch (activeTab) {
            case 'videos':
                return <VideoGrid />;
            case 'channels':
                return <Channels />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-teal-800 min-h-screen text-white">
            <Header 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
            />

            <h1 className="text-3xl font-bold text-center mt-10">
                {PAGE_TITLES[activeTab]}
            </h1>

            <div className="p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default HomePage;