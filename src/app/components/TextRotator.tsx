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

function getFullText(item: TextItem) {
  return typeof item === 'string' ? item : item.prefix + item.title;
}

export default function TextRotator({
  texts, 
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = "",
  titleClassName = ""
}: TextRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Start on the first full text (paused) so server and client render the same markup
  const [currentText, setCurrentText] = useState(() => getFullText(texts[0]));
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const currentItem = texts[currentIndex];
    const currentFullText = getFullText(currentItem);

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

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          const nextText = currentFullText.substring(0, currentText.length - 1);
          setCurrentText(nextText);
          if (nextText.length <= minLength) {
            setIsDeleting(false);
            setCurrentIndex(nextIndex);
          }
        } else {
          const nextText = currentFullText.substring(0, currentText.length + 1);
          setCurrentText(nextText);
          if (nextText === currentFullText) {
            setIsPaused(true);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  const currentItem = texts[currentIndex];

  if (typeof currentItem === 'string') {
    return (
      <span className={`inline-block ${className}`}>
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    );
  }

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
