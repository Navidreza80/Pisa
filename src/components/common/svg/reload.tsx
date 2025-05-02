import { useEffect, useRef } from 'react';

export default function Reload() {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!circleRef.current) return;

    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = (elapsedTime % 5500) / 5500; 
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = `${125.6 * (1 - progress)}`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        
        <circle
          ref={circleRef}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="125.6" 
          strokeDashoffset="125.6"
          style={{
            transformOrigin: '25px 25px',
            transform: 'rotate(-90deg)' 
          }}
        />
      </svg>
    </div>
  );
};