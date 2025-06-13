'use client';

import React, { createContext, ReactNode, useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
    mode: ThemeMode;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
    mode: 'light',
    toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = React.useState<ThemeMode>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme-mode') as ThemeMode;
        if (savedTheme === 'light' || savedTheme === 'dark') {
            setMode(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setMode('dark');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme-mode', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ConfigProvider
                theme={{
                    algorithm: mode === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
                    token: {
                        // Здесь настраиваются базовые опции для моих компонентов, чтобы был единый стиль у всех
                        colorPrimary: '#0e4a40',
                        borderRadius: 12,
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
