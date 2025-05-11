import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-teal-900/50 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-center">
                        <p className="text-teal-200">
                            Created by{' '}
                            <Link
                                href="https://t.me/yamkin_alex"
                                target="_blank"
                                className="text-white hover:text-teal-300 transition-colors"
                            >
                                @yamkin_alex
                            </Link>
                        </p>
                        <p className="text-teal-300 text-sm mt-1">© {new Date().getFullYear()} Relax App. All rights reserved.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="https://t.me/yamkin_alex"
                            target="_blank"
                            className="text-teal-200 hover:text-white transition-colors"
                            aria-label="Telegram"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.2-.04-.28-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.49.8-.75 3.12-1.36 5.2-2.26 6.24-2.7 2.97-1.24 3.59-1.45 3.99-1.45.09 0 .28.02.4.12.11.08.14.19.15.27-.01.07.01.24 0 .38z" />
                            </svg>
                        </Link>
                        <Link
                            href="https://github.com/yamkin29"
                            target="_blank"
                            className="text-teal-200 hover:text-white transition-colors"
                            aria-label="GitHub"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
