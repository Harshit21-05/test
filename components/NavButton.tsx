
import React from 'react';
import type { Theme } from '../types';

interface NavButtonProps {
    href: string;
    theme: Theme;
    children: React.ReactNode;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const themeStyles: Record<Theme, string> = {
    pushup: 'bg-[linear-gradient(135deg,rgba(139,69,19,0.2),rgba(160,82,45,0.1))] border-yellow-800/30 hover:bg-[linear-gradient(135deg,rgba(139,69,19,0.4),rgba(160,82,45,0.3))] hover:border-yellow-600/80 focus:border-yellow-600/80 focus:shadow-[0_0_0_3px_rgba(205,133,63,0.4)] hover:shadow-[0_10px_40px_rgba(139,69,19,0.4)]',
    surya: 'bg-[linear-gradient(135deg,rgba(184,134,11,0.2),rgba(218,165,32,0.1))] border-yellow-600/30 hover:bg-[linear-gradient(135deg,rgba(184,134,11,0.4),rgba(218,165,32,0.3))] hover:border-yellow-400/80 focus:border-yellow-400/80 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.4)] hover:shadow-[0_10px_40px_rgba(184,134,11,0.4)]',
    chakra: 'bg-[linear-gradient(135deg,rgba(72,61,139,0.2),rgba(106,90,205,0.1))] border-purple-600/30 hover:bg-[linear-gradient(135deg,rgba(72,61,139,0.4),rgba(106,90,205,0.3))] hover:border-purple-400/80 focus:border-purple-400/80 focus:shadow-[0_0_0_3px_rgba(123,104,238,0.4)] hover:shadow-[0_10px_40px_rgba(72,61,139,0.4)]',
    progress: 'bg-[linear-gradient(135deg,rgba(34,139,34,0.2),rgba(0,128,0,0.1))] border-green-600/30 hover:bg-[linear-gradient(135deg,rgba(34,139,34,0.4),rgba(0,128,0,0.3))] hover:border-green-400/80 focus:border-green-400/80 focus:shadow-[0_0_0_3px_rgba(60,179,113,0.4)] hover:shadow-[0_10px_40px_rgba(34,139,34,0.4)]',
};

const NavButton: React.FC<NavButtonProps> = ({ href, theme, children, onMouseEnter, onMouseLeave }) => {
    const baseClasses = "relative block w-full py-5 px-8 text-decoration-none text-gray-200 border-2 border-transparent rounded-xl backdrop-blur-md transition-all duration-300 ease-out overflow-hidden group focus:outline-none";
    const hoverClasses = "hover:transform hover:-translate-y-1 hover:scale-[1.02] hover:text-white";

    return (
        <a
            href={href}
            className={`${baseClasses} ${hoverClasses} ${themeStyles[theme]}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <span className="relative z-10 text-lg font-medium tracking-wider">
                {children}
            </span>
            <div className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] transition-all duration-700 ease-in-out group-hover:left-full z-0"></div>
        </a>
    );
};

export default NavButton;
