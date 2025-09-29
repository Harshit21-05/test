
import React from 'react';
import type { Theme } from '../types';

interface BackgroundAnimationsProps {
  activeTheme: Theme | null;
}

const AnimationContainer: React.FC<{ theme: Theme, activeTheme: Theme | null, children: React.ReactNode }> = ({ theme, activeTheme, children }) => (
  <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activeTheme === theme ? 'opacity-60 animate-[fadeInSymbols_0.5s_ease]' : 'opacity-0'}`}>
    {children}
  </div>
);

const BackgroundAnimations: React.FC<BackgroundAnimationsProps> = ({ activeTheme }) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      
      {/* Pushup Symbols */}
      <AnimationContainer theme="pushup" activeTheme={activeTheme}>
        <div className="absolute w-[60px] h-[20px] bg-[#8B4513] rounded-[10px] top-[20%] left-[10%] animate-[rotateDumbbell_3s_ease-in-out_infinite]">
            <div className="absolute w-[20px] h-[30px] bg-[#A0522D] rounded-full -top-[5px] -left-[10px]"></div>
            <div className="absolute w-[20px] h-[30px] bg-[#A0522D] rounded-full -top-[5px] -right-[10px]"></div>
        </div>
        <div className="absolute w-[60px] h-[20px] bg-[#8B4513] rounded-[10px] top-[60%] left-[80%] animate-[rotateDumbbell_3s_ease-in-out_infinite] [animation-delay:-1s]">
            <div className="absolute w-[20px] h-[30px] bg-[#A0522D] rounded-full -top-[5px] -left-[10px]"></div>
            <div className="absolute w-[20px] h-[30px] bg-[#A0522D] rounded-full -top-[5px] -right-[10px]"></div>
        </div>
        <div className="absolute w-[80px] h-[80px] top-[40%] right-[15%] animate-[powerPulse_2s_ease-in-out_infinite]">
            <div className="absolute w-full h-full border-2 border-[#CD853F] rounded-full opacity-70"></div>
            <div className="absolute w-full h-full border-2 border-[#CD853F] rounded-full opacity-70 animate-[expandRing_2s_ease-out_infinite]"></div>
        </div>
      </AnimationContainer>

      {/* Surya Symbols */}
      <AnimationContainer theme="surya" activeTheme={activeTheme}>
        <div className="absolute w-[120px] h-[120px] top-[15%] right-[10%] animate-[sunRotate_6s_linear_infinite]">
          <div className="absolute w-full h-full border-2 border-[#B8860B] rounded-full opacity-40 [clip-path:polygon(50%_0%,60%_40%,100%_50%,60%_60%,50%_100%,40%_60%,0%_50%,40%_40%)]"></div>
        </div>
        <div className="absolute w-[60px] h-[60px] top-[70%] left-[20%] animate-[lotusBloom_4s_ease-in-out_infinite]">
            <div className="absolute w-[30px] h-[40px] bg-[#DAA520] opacity-60 [border-radius:50%_50%_50%_50%_/_60%_60%_40%_40%] rotate-45"></div>
            <div className="absolute w-[30px] h-[40px] bg-[#DAA520] opacity-60 [border-radius:50%_50%_50%_50%_/_60%_60%_40%_40%] -rotate-45"></div>
        </div>
        <div className="absolute w-[100px] h-[100px] bottom-[20%] right-[20%] border-2 border-[#B8860B] rounded-full opacity-40 animate-[peacefulPulse_3s_ease-in-out_infinite]"></div>
      </AnimationContainer>

      {/* Chakra Symbols */}
      <AnimationContainer theme="chakra" activeTheme={activeTheme}>
        <div className="absolute w-[80px] h-[80px] top-[25%] left-[15%] border-4 border-[#483D8B] rounded-full animate-[chakraSpin_5s_linear_infinite]">
          <div className="absolute w-full h-[2px] bg-[#6A5ACD] top-1/2 left-0 origin-center"></div>
          <div className="absolute w-full h-[2px] bg-[#6A5ACD] top-1/2 left-0 origin-center rotate-60"></div>
          <div className="absolute w-full h-[2px] bg-[#6A5ACD] top-1/2 left-0 origin-center rotate-120"></div>
        </div>
        <div className="absolute w-[60px] h-[60px] top-[60%] right-[25%] animate-[spiralRotate_4s_ease-in-out_infinite]">
            <div className="absolute w-full h-full border-2 border-[#7B68EE] rounded-full border-t-transparent border-r-transparent"></div>
        </div>
        <div className="absolute w-[40px] h-[60px] bottom-[30%] left-[30%] bg-[linear-gradient(45deg,#483D8B,#6A5ACD)] [clip-path:polygon(50%_0%,100%_40%,75%_100%,25%_100%,0%_40%)] animate-[crystalGlow_3s_ease-in-out_infinite]"></div>
      </AnimationContainer>
      
      {/* Progress Tracker Symbols */}
      <AnimationContainer theme="progress" activeTheme={activeTheme}>
        <div className="absolute top-[20%] right-[15%] flex items-end h-[80px] w-[100px] gap-2">
            <div className="w-1/4 h-[40%] bg-green-500/80 rounded-t-sm animate-[graphRise_2s_ease-in-out_infinite] [animation-delay:0s]"></div>
            <div className="w-1/4 h-[70%] bg-green-500/80 rounded-t-sm animate-[graphRise_2s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
            <div className="w-1/4 h-[50%] bg-green-500/80 rounded-t-sm animate-[graphRise_2s_ease-in-out_infinite] [animation-delay:0.4s]"></div>
            <div className="w-1/4 h-[80%] bg-green-500/80 rounded-t-sm animate-[graphRise_2s_ease-in-out_infinite] [animation-delay:0.6s]"></div>
        </div>
        <div className="absolute w-[60px] h-[60px] bottom-[25%] left-[20%] text-green-400 animate-[arrowPulse_2.5s_ease-in-out_infinite]">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28L19.08 18.5M2.25 18h.008v.008H2.25V18Z" /></svg>
        </div>
        <div className="absolute w-[100px] h-[100px] top-[60%] right-[10%]">
          <div className="absolute inset-0 border-2 border-green-500/70 rounded-full animate-[targetFocus_3s_ease-out_infinite] [animation-delay:0s]"></div>
          <div className="absolute inset-0 border-2 border-green-500/70 rounded-full animate-[targetFocus_3s_ease-out_infinite] [animation-delay:1s]"></div>
        </div>
      </AnimationContainer>

    </div>
  );
};

export default BackgroundAnimations;
