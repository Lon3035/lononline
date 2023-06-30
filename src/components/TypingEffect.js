import React, { useState, useEffect, useRef } from 'react';
import './TypingEffect.css';

const TypingEffect = ({ words }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [textCompleted, setTextCompleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [delay, setDelay] = useState(150);
  const [blinkDelay, setBlinkDelay] = useState(7000);
  const containerRef = useRef(null);

  const handleTypingEffect = () => {
    const word = words[wordIndex];
    const isLastWord = wordIndex === words.length - 1;
    const currentCharIndex = isDeleting ? charIndex - 1 : charIndex;

    if (!isDeleting && !textCompleted) {
      const nextChar = word[currentCharIndex];
      if (nextChar) {
        setDisplayText((prevText) => prevText + nextChar);
        setCharIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsDeleting(true);
        setDelay(100);
        if (isLastWord) {
          setTextCompleted(true);
        }
      }
    } else if (isDeleting && displayText.length > 0) {
      setDisplayText((prevText) => prevText.slice(0, -1));
      setCharIndex((prevIndex) => prevIndex - 1);
    } else if (!isDeleting && deleteComplete) {
      setIsDeleting(true);
      setDeleteComplete(false);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setDelay(150);
      if (isLastWord) {
        setTextCompleted(true);
      } else {
        setWordIndex((prevIndex) => prevIndex + 1);
        setCharIndex(0);
        setDisplayText('');
      }
    }
  };

  const handleGlobalKeyPress = (event) => {
    if (containerRef.current && !textCompleted) {
      if (event.key.length === 1) {
        setDisplayText((prevText) => prevText + event.key);
      } else if (event.key === 'Backspace') {
        setDisplayText((prevText) => prevText.slice(0, -1));
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleTypingEffect, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, charIndex, displayText, isDeleting, deleteComplete, textCompleted, delay]);

  useEffect(() => {
    if (showCursor && !isDeleting) {
      const blinkTimer = setInterval(() => {
        setShowCursor((prevShowCursor) => !prevShowCursor);
      }, blinkDelay);

      return () => {
        clearInterval(blinkTimer);
      };
    } else if (!showCursor && !isDeleting) {
      setShowCursor(true);
    }
  }, [showCursor, isDeleting, blinkDelay]);

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyPress);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, []);

  return (
    <div
      className="typing-effect"
      ref={containerRef}
      tabIndex="0"
      onClick={() => containerRef.current.focus()}
    >
      <span className="text">{displayText}</span>
      {showCursor && <span className="cursor" />}
    </div>
  );
};

export default TypingEffect;
