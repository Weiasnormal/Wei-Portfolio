"use client";

import { useEffect, useRef, useState } from "react";

type FadeInViewProps = {
  children: React.ReactNode;
  delay?: number; // seconds
  className?: string;
  /** vertical distance (px) the element travels while fading in */
  yOffset?: number;
  /** horizontal distance (px) the element travels while fading in */
  xOffset?: number;
  as?: "div" | "li" | "article";
};

export default function FadeInView({
  children,
  delay = 0,
  className = "",
  yOffset = 20,
  xOffset = 0,
  as = "div",
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate(0px, 0px)"
          : `translate(${xOffset}px, ${yOffset}px)`,
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}