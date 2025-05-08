const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-teal-900/95 backdrop-blur-sm shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <nav className="flex gap-6 text-lg">
                        <a href="#" className="font-semibold text-white hover:text-teal-200 transition-colors">Videos</a>
                        <a href="#" className="text-white hover:text-teal-200 transition-colors">Music</a>
                        <a href="#" className="text-white hover:text-teal-200 transition-colors">Other</a>
                    </nav>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 text-white hover:text-teal-200 transition-colors">Settings</button>
                        <button className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition-colors">Login</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;