import React, { useState, useEffect } from 'react';
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
  const [delay, setDelay] = useState(250);
  const [blinkDelay, setBlinkDelay] = useState(7000);

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
        setDelay(150);
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
      setDelay(250);
      if (isLastWord) {
        setTextCompleted(true);
      } else {
        setWordIndex((prevIndex) => prevIndex + 1);
        setCharIndex(0);
        setDisplayText('');
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
  

  return (
    <div className="typing-effect">
      <span className="text">{displayText}</span>
      {showCursor && <span className="cursor" />}
    </div>
  );
};

export default TypingEffect;
