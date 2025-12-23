"use client"

export default function MatrixRain() {
  // Simple CSS-based matrix rain effect
  // You can enhance this later or remove if you prefer a simpler hero
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="matrix-rain">
        {/* Simple animated background effect */}
        <style jsx>{`
          .matrix-rain {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, transparent, rgba(0, 255, 65, 0.03));
            animation: matrix-pulse 3s ease-in-out infinite;
          }
          @keyframes matrix-pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  )
}
