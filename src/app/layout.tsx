import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Header from '@/components/header/Header';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Relax App',
    description: 'Ambient background videos and channels',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning className={`${inter.className} bg-teal-800 min-h-screen text-white`}>
                <SpeedInsights />
                <Header />
                {children}
            </body>
        </html>
    );
}
