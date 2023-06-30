import React, { useState, useEffect } from 'react';
import TypingEffect from './TypingEffect';
import './App.css';

document.title = 'Lon';



const App = () => {
  const [backgroundColor, setBackgroundColor] = useState('');
  const colors = ['#414141', '#335b35', '#5c251f', '#33336a', '#4d2771', '#505132'];

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

  return (
    <div className="app" style={{ backgroundColor }}>
      <TypingEffect text="Hello World" />
    </div>
  );
};

export default App;
