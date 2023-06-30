import React, { useState, useEffect } from 'react';
import TypingEffect from '../components/TypingEffect';
import './Home.css';





const Home = () => {
  const [backgroundColor, setBackgroundColor] = useState('');
  const colors = ['#414141', '#335b35', '#5c251f', '#33336a', '#4d2771', '#505132'];
  const words = ["hello world","print('hello world')", "System.out.println('hello world')","console.log('hello world')","is there anybody out there?", "still here?", "really", "it's ok", "you can go now", "for real", "don't annoy me", "ok stop", "for real", "thats enough", "i'm serious", "ok", "i warned you", "you can co your own typing now"]

  useEffect(() => {
    document.title = 'Lon';
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

  return (
    <div className="app" style={{ backgroundColor }}>
      <div className='column'>
      <TypingEffect words={words} />
      </div>
    </div>
  );
};

export default Home;
