// TypingEffect.js
import React, { useState, useEffect } from 'react';
import './TypingEffect.css';

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [textCompleted, setTextCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(timer);
        setTextCompleted(true); // Satz vollständig getippt
        setTimeout(() => {
          setShowCursor(false);
        }, 4000); // Cursor nach 4 Sekunden ausblenden
      }
    }, 200); // Geschwindigkeit des Typing-Effekts in Millisekunden

    return () => {
      clearInterval(timer);
    };
  }, [text, currentIndex]);

  useEffect(() => {
    if (showCursor && textCompleted) {
      const blinkTimer = setInterval(() => {
        setShowCursor((prevShowCursor) => !prevShowCursor);
      }, 500); // Blinkgeschwindigkeit des Cursors in Millisekunden

      return () => {
        clearInterval(blinkTimer);
      };
    }
  }, [showCursor, textCompleted]);

  return (
    <div className="typing-effect">
      <span className="text">{displayText}</span>
      {showCursor && <span className="cursor" />}
    </div>
  );
};

export default TypingEffect;
