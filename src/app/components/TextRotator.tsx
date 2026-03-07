"use client";

import { useState, useEffect } from "react";

type TextItem = string | { prefix: string; title: string };

type TextRotatorProps = {
  texts: TextItem[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  titleClassName?: string;
};

export default function TextRotator({ 
  texts, 
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = "",
  titleClassName = ""
}: TextRotatorProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const currentItem = texts[currentIndex];
    const currentFullText = typeof currentItem === 'string' 
      ? currentItem 
      : currentItem.prefix + currentItem.title;

    // Get next item to check if prefixes match
    const nextIndex = (currentIndex + 1) % texts.length;
    const nextItem = texts[nextIndex];
    
    const currentPrefix = typeof currentItem === 'object' ? currentItem.prefix : '';
    const nextPrefix = typeof nextItem === 'object' ? nextItem.prefix : '';
    const hasSamePrefix = currentPrefix === nextPrefix && currentPrefix !== '';
    
    // Minimum length to delete to (prefix length if same, 0 otherwise)
    const minLength = hasSamePrefix ? currentPrefix.length : 0;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && currentText === currentFullText) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText.length === minLength) {
      setIsDeleting(false);
      setCurrentIndex(nextIndex);
      return;
    }

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setCurrentText(currentFullText.substring(0, currentText.length - 1));
        } else {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [mounted, currentText, isDeleting, isPaused, currentIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  const currentItem = texts[currentIndex];
  
  // Show the first full text during SSR to avoid hydration mismatch
  if (!mounted) {
    const firstItem = texts[0];
    if (typeof firstItem === 'string') {
      return (
        <span className={`inline-block ${className}`}>
          {firstItem}
        </span>
      );
    }
    return (
      <span className={`inline-block ${className}`}>
        <span>{firstItem.prefix}</span>
        <span className={titleClassName}>{firstItem.title}</span>
      </span>
    );
  }
  
  if (typeof currentItem === 'string') {
    return (
      <span className={`inline-block ${className}`}>
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    );
  }

  const fullText = currentItem.prefix + currentItem.title;
  const prefixLength = currentItem.prefix.length;
  const displayedPrefix = currentText.substring(0, Math.min(currentText.length, prefixLength));
  const displayedTitle = currentText.substring(prefixLength);

  return (
    <span className={`inline-block ${className}`}>
      <span>{displayedPrefix}</span>
      <span className={titleClassName}>{displayedTitle}</span>
      <span className="animate-pulse">|</span>
    </span>
  );
}
