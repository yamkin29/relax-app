import Link from 'next/link';
export default function Footer() {
    return (
        <footer className="site-footer">
            <span>Relax App · A softer rhythm for your day.</span>
            <span>
                Made by{' '}
                <Link href="https://t.me/yamkin_alex" target="_blank" rel="noopener noreferrer">
                    @yamkin_alex
                </Link>{' '}
                ·{' '}
                <Link href="https://github.com/yamkin29" target="_blank" rel="noopener noreferrer">
                    GitHub
                </Link>
            </span>
        </footer>
    );
}
