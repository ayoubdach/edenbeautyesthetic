import { useEffect, useRef } from 'react';

interface ButterflyProps {
  className?: string;
  size?: number;
  color?: string;
  delay?: number;
}

export default function Butterfly({ className = '', size = 60, color = '#e91e8c', delay = 0 }: ButterflyProps) {
  const butterflyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = butterflyRef.current;
    if (!el) return;
    el.style.animationDelay = `${delay}s`;
  }, [delay]);

  return (
    <div
      ref={butterflyRef}
      className={`butterfly-fly pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="butterfly-float w-full h-full"
        style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
      >
        {/* Left wing */}
        <g className="wing-left" style={{ transformOrigin: '50px 50px' }}>
          <path
            d="M48 50 Q20 20 10 35 Q5 50 20 55 Q35 60 48 50"
            fill={color}
            opacity="0.9"
          />
          <path
            d="M48 50 Q25 55 15 70 Q10 85 25 80 Q40 75 48 50"
            fill={color}
            opacity="0.7"
          />
          <circle cx="22" cy="38" r="3" fill="white" opacity="0.6" />
          <circle cx="18" cy="50" r="2" fill="white" opacity="0.4" />
          <circle cx="28" cy="68" r="2.5" fill="white" opacity="0.5" />
        </g>
        {/* Right wing */}
        <g className="wing-right" style={{ transformOrigin: '50px 50px' }}>
          <path
            d="M52 50 Q80 20 90 35 Q95 50 80 55 Q65 60 52 50"
            fill={color}
            opacity="0.9"
          />
          <path
            d="M52 50 Q75 55 85 70 Q90 85 75 80 Q60 75 52 50"
            fill={color}
            opacity="0.7"
          />
          <circle cx="78" cy="38" r="3" fill="white" opacity="0.6" />
          <circle cx="82" cy="50" r="2" fill="white" opacity="0.4" />
          <circle cx="72" cy="68" r="2.5" fill="white" opacity="0.5" />
        </g>
        {/* Body */}
        <ellipse cx="50" cy="50" rx="3" ry="12" fill="#1a0a2e" />
        {/* Antennae */}
        <path d="M48 38 Q42 28 38 30" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M52 38 Q58 28 62 30" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="38" cy="30" r="1.5" fill={color} />
        <circle cx="62" cy="30" r="1.5" fill={color} />
      </svg>
    </div>
  );
}

export function ButterflyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#e91e8c', '#ff6b9d', '#c77dff', '#7b1fa2', '#fff0f5'];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticles = () => {
      particles.length = 0;
      const count = Math.min(80, Math.floor(canvas.offsetWidth / 15));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5 - 0.3,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += (Math.random() - 0.5) * 0.02;
        p.opacity = Math.max(0.1, Math.min(0.8, p.opacity));

        if (p.y < -10) {
          p.y = canvas.offsetHeight + 10;
          p.x = Math.random() * canvas.offsetWidth;
        }
        if (p.x < -10) p.x = canvas.offsetWidth + 10;
        if (p.x > canvas.offsetWidth + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * 0.15;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
