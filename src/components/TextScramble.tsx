import { useEffect, useRef, useState } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ text, className = '' }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const queueRef = useRef<Array<{ from: string; to: string; start: number; end: number; char?: string }>>([]);
  const frameCounter = useRef(0);

  useEffect(() => {
    const length = Math.max(text.length, display.length);
    queueRef.current = [];
    for (let i = 0; i < length; i++) {
      const from = display[i] || '';
      const to = text[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      queueRef.current.push({ from, to, start, end });
    }

    cancelAnimationFrame(frameRef.current);
    frameCounter.current = 0;

    const update = () => {
      let output = '';
      let complete = 0;
      for (let i = 0; i < queueRef.current.length; i++) {
        const { from, to, start, end } = queueRef.current[i];
        let char = queueRef.current[i].char;
        if (frameCounter.current >= end) {
          complete++;
          output += to;
        } else if (frameCounter.current >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queueRef.current[i].char = char;
          }
          output += `<span class="text-eden-rose/50">${char}</span>`;
        } else {
          output += from;
        }
      }
      setDisplay(output);
      frameCounter.current++;
      if (complete === queueRef.current.length) {
        return;
      }
      frameRef.current = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(frameRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: display }}
    />
  );
}
