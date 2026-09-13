import { useEffect, useState, useRef } from "react";

export default function AnimatedCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [outlinePos, setOutlinePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const isDesktopRef = useRef(window.innerWidth >= 1024);
  const animFrameIdRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    isDesktopRef.current = isDesktop;

    if (!isDesktop) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      return;
    }

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setOutlinePos({ x: currentX, y: currentY });
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Use event delegation instead of attaching to individual elements
    // Check if hovered element is interactive
    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target?.matches?.('a, button, [data-cursor="hover"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (target?.matches?.('a, button, [data-cursor="hover"]')) {
        setIsHovering(false);
      }
    };

    try {
      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", handleMouseEnter, true);
      document.addEventListener("mouseleave", handleMouseLeave, true);
      animFrameIdRef.current = requestAnimationFrame(animate);
    } catch (e) {
      console.debug("Error setting up cursor listeners:", e);
    }

    return () => {
      try {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", handleMouseEnter, true);
        document.removeEventListener("mouseleave", handleMouseLeave, true);
      } catch (e) {
        // Silently ignore
      }

      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, []);

  if (!isDesktopRef.current) return null;

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 0 : 1})`,
        }}
      />
      <div
        className="cursor-outline"
        style={{
          left: outlinePos.x,
          top: outlinePos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
          background: isHovering ? "rgba(124,58,237,0.1)" : "transparent",
        }}
      />
    </>
  );
}


