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
                        // — Цвета
                        colorPrimary: '#0e4a40',
                        colorText: '#ffffff',
                        colorTextSecondary: 'rgba(255,255,255,0.85)',

                        // Делаем прозрачными фоны Layout и всех контейнеров
                        colorBgLayout: 'transparent',
                        colorBgContainer: 'transparent',

                        // — Скругления
                        borderRadius: 12,
                        borderRadiusSM: 8,
                        borderRadiusLG: 16,

                        // — Размеры шрифтов
                        fontSize: 16,
                        fontSizeSM: 14,
                        fontSizeLG: 18,

                        // — Внутренние отступы компонентов
                        padding: 24,
                        paddingSM: 16,
                        paddingLG: 32,

                        // — Высота контролов (Input, Button)
                        controlHeight: 40,
                        controlHeightSM: 32,
                        controlHeightLG: 48,
                    },

                    // Опционально: если нужно **точечно** переопределить какой-то компонент
                    components: {
                        Button: {
                            controlHeight: 48, // все кнопки будут выше
                            borderRadius: 12,
                        },
                        Card: {
                            padding: 24, // единый padding для всех Card
                            borderRadius: 12,
                        },
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
