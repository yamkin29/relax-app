import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Header from '@/components/header/Header';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Footer from '@/components/Footer';
import 'antd/dist/reset.css';
import ThemeProvider from '@/components/ThemeProvider';
import '@ant-design/v5-patch-for-react-19';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Relax App',
    description: 'Your personal relaxation companion',
    icons: {
        icon: '/icon.svg',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning className={`${inter.className} bg-teal-800 min-h-screen text-white flex flex-col`}>
                <ThemeProvider>
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <SpeedInsights />
                    <Analytics />
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
