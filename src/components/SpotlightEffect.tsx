import { useEffect, useRef } from 'react';

export default function SpotlightEffect() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(233, 30, 140, 0.06), transparent 40%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(233, 30, 140, 0.06), transparent 40%)' }}
    />
  );
}
