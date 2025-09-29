
import React, { useState, useEffect } from 'react';
import type { Theme } from './types';
import Header from './components/Header';
import NavButton from './components/NavButton';
import BackgroundAnimations from './components/BackgroundAnimations';

const navItems = [
  { theme: 'pushup', text: 'Pushup Challenge', href: 'https://target-befit.vercel.app/pushup-challenge/index.html' },
  { theme: 'surya', text: 'Surya Namaskar', href: 'https://target-befit.vercel.app/surya-namaskar/index.html' },
  { theme: 'chakra', text: 'Heal Chakras', href: 'https://target-befit.vercel.app/heal-chakras/index.html' },
  { theme: 'progress', text: 'Progress Tracker', href: 'https://target-befit.vercel.app/fitness-tracker/index.html' }
] as const;


function App() {
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] font-['FKGroteskNeue',_sans-serif] text-[#e0e0e0] overflow-hidden transition-opacity duration-500 ease-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative min-h-screen flex items-center justify-center">
        <BackgroundAnimations activeTheme={activeTheme} />

        <div className="relative z-10 text-center p-8 w-full">
          <Header isLoaded={isLoaded} />

          <nav className="flex flex-col gap-6 items-center max-w-sm mx-auto mt-12">
            {navItems.map((item, index) => (
              <div
                key={item.theme}
                className={`w-full transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${500 + index * 150}ms` }}
              >
                <NavButton
                  href={item.href}
                  theme={item.theme}
                  onMouseEnter={() => setActiveTheme(item.theme)}
                  onMouseLeave={() => setActiveTheme(null)}
                >
                  {item.text}
                </NavButton>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;
