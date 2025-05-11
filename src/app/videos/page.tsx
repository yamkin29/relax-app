'use client'
import React from "react";
import VideoGrid from "@/components/videoGrid/VideoGrid";

const VideosPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mt-10 mb-8">
                Ambient Background Videos
            </h1>
            <VideoGrid />
        </div>
    );
};

export default VideosPage; 