'use client'
import React from "react";
import Channels from "@/components/Channels";

const ChannelsPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mt-10 mb-8">
                Channels
            </h1>
            <Channels />
        </div>
    );
};

export default ChannelsPage; 