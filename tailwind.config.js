/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                destructive: { DEFAULT: 'var(--ui-destructive)', foreground: 'var(--ink)' },
                ring: 'var(--accent)',
                input: 'var(--line)',
                border: 'var(--line)',
                card: { DEFAULT: 'var(--surface)', foreground: 'var(--ink)' },
                popover: { DEFAULT: 'var(--surface)', foreground: 'var(--ink)' },
                accent: { DEFAULT: 'var(--selected)', foreground: 'var(--ink)' },
                muted: { DEFAULT: 'var(--selected)', foreground: 'var(--muted)' },
                secondary: { DEFAULT: 'var(--selected)', foreground: 'var(--ink)' },
                primary: { DEFAULT: 'var(--accent)', foreground: 'var(--canvas)' },
                foreground: 'var(--ink)',
                background: 'var(--canvas)',
                teal: {
                    800: '#115e59',
                },
            },
        },
    },
    plugins: [],
};
