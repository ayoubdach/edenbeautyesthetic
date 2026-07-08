import { useState, useEffect } from 'react';

const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

export default function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitching(true);
        const iterations = 3 + Math.floor(Math.random() * 5);
        let count = 0;
        const glitchInterval = setInterval(() => {
          setDisplay(
            text
              .split('')
              .map((char) => {
                if (char === ' ') return ' ';
                if (Math.random() > 0.7) return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                return char;
              })
              .join('')
          );
          count++;
          if (count >= iterations) {
            clearInterval(glitchInterval);
            setDisplay(text);
            setGlitching(false);
          }
        }, 50);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{display}</span>
      {glitching && (
        <>
          <span
            className="absolute inset-0 text-eden-pink/50 z-0"
            style={{ clipPath: 'inset(20% 0 60% 0)', transform: 'translateX(-3px)' }}
          >
            {display}
          </span>
          <span
            className="absolute inset-0 text-eden-lavender/50 z-0"
            style={{ clipPath: 'inset(60% 0 20% 0)', transform: 'translateX(3px)' }}
          >
            {display}
          </span>
        </>
      )}
    </span>
  );
}
