export default function NeonText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        textShadow: `
          0 0 5px rgba(233, 30, 140, 0.5),
          0 0 10px rgba(233, 30, 140, 0.4),
          0 0 20px rgba(233, 30, 140, 0.3),
          0 0 40px rgba(233, 30, 140, 0.2)
        `,
      }}
    >
      {text}
      <span
        className="absolute inset-0 blur-sm opacity-50"
        style={{
          textShadow: `
            0 0 20px rgba(233, 30, 140, 0.8),
            0 0 40px rgba(233, 30, 140, 0.6)
          `,
        }}
      >
        {text}
      </span>
    </span>
  );
}
