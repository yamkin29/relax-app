import React from 'react';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6">About Relax‑App</h1>

                <div className="bg-teal-900/50 rounded-lg p-6 backdrop-blur-sm space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Our Mission</h2>
                        <p className="text-gray-200">
                            Relax‑App is a collection of atmospheric videos with subtle music, created for those who love to relax, work, or
                            read with a pleasant visual background. We manually curate the most harmonious ambient videos from YouTube and
                            gather them in one place, so you don&apos;t have to spend time searching.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">What You&apos;ll Find on the Site</h2>
                        <ul className="list-disc list-inside text-gray-200 space-y-2">
                            <li>Video playlists — peaceful landscapes, rainy cafes, fireplace scenes, and other thematic content</li>
                            <li>Channel catalog — a list of YouTube creators who regularly publish similar content</li>
                            <li>
                                Minimal distractions — a clean interface without excessive advertising, so nothing interferes with your
                                relaxation or focus
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Development Status</h2>
                        <p className="text-gray-200">
                            Relax‑App is under active development. We continuously improve functionality, add new videos, and experiment
                            with design. There might be minor issues or temporary absence of some features — please bear with us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">How to Help the Project</h2>
                        <p className="text-gray-200 mb-4">
                            Do you have an idea to make Relax‑App better? Want to suggest a favorite channel or video? Write to us!
                            We&apos;re happy to consider any suggestions:
                        </p>
                        <ul className="list-disc list-inside text-gray-200 space-y-2">
                            <li>
                                Telegram:{' '}
                                <a
                                    href="https://t.me/yamkin_alex"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-300 hover:text-teal-200 transition-colors"
                                >
                                    @yamkin_alex
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">Acknowledgments</h2>
                        <p className="text-gray-200">
                            Thank you to all ambient video creators for inspiration, and to you — for using Relax‑App. Your feedback helps
                            us grow and develop.
                        </p>
                        <p className="text-gray-200 mt-2">Enjoy your relaxation and productive work!</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
