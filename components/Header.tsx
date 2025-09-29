
import React from 'react';

interface HeaderProps {
    isLoaded: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoaded }) => {
    return (
        <header>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent tracking-wide mb-4 shadow-purple-500/30 [text-shadow:0_0_30px_var(--tw-shadow-color)] transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                style={{ transitionDelay: '100ms' }}>
                BE FIT CHALLENGE
            </h1>
            <p className={`text-lg text-gray-400 font-light tracking-widest transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
                style={{ transitionDelay: '300ms' }}>
                Choose Your Fitness Journey
            </p>
        </header>
    );
};

export default Header;
