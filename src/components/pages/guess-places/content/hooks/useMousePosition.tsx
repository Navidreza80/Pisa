import { useCallback, useState } from "react";

export const useMousePosition = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / containerRef.current.offsetWidth - 0.5,
        y: (e.clientY - rect.top) / containerRef.current.offsetHeight - 0.5,
      });
    }
  }, [containerRef]);

  return { mousePosition, handleMouseMove };
};