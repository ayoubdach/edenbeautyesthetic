import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; size: number; speedY: number; speedX: number;
  rotation: number; rotationSpeed: number; opacity: number; color: string;
  shape: 'diamond' | 'star' | 'circle';
}

export default function DiamondParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const colors = ['#e91e8c', '#ff6b9d', '#c77dff', '#7b1fa2', '#ffd700', '#ffb6c1'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1,
          speedY: -(Math.random() * 0.8 + 0.2),
          speedX: (Math.random() - 0.5) * 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: ['diamond', 'star', 'circle'][Math.floor(Math.random() * 3)] as Particle['shape'],
        });
      }
    };

    const drawDiamond = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.6, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.6, 0);
      ctx.closePath();
      ctx.fill();
      // Inner shine
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.5);
      ctx.lineTo(size * 0.3, 0);
      ctx.lineTo(0, size * 0.3);
      ctx.lineTo(-size * 0.3, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawCircle = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      // Glow
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 3;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.opacity += (Math.random() - 0.5) * 0.01;
        p.opacity = Math.max(0.1, Math.min(0.8, p.opacity));

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        if (p.shape === 'diamond') drawDiamond(p.x, p.y, p.size, p.rotation, p.color, p.opacity);
        else if (p.shape === 'star') drawStar(p.x, p.y, p.size, p.rotation, p.color, p.opacity);
        else drawCircle(p.x, p.y, p.size, p.color, p.opacity);
      });

      animId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}
