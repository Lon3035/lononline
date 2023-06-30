import React, { useState, useEffect } from 'react';
import TypingEffect from '../components/TypingEffect';
import './Count.css';
import Couter from '../components/Counter.js';
import heart from '../images/heart.png'





const Count = () => {
  const [backgroundColor, setBackgroundColor] = useState('');
  const colors = [ '#33336a', '#4d2771'];

  useEffect(() => {
    document.title = '<3';
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

  return (
      <div className="count" style={{ backgroundColor }}>
        <img className="heart" src={heart} alt="heart" />
        <Couter className="counter" targetDate="2023-07-12T16:10" />
      </div>
  );
};

export default Count;
