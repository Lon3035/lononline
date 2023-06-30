import React, { useState, useEffect } from 'react';
import TypingEffect from '../components/TypingEffect';
import './Home.css';

document.title = 'Lon';



const Home = () => {
  const [backgroundColor, setBackgroundColor] = useState('');
  const colors = ['#414141', '#335b35', '#5c251f', '#33336a', '#4d2771', '#505132'];
  const words = ["hello world","print('hello world')", "system.out.println('hello world')","console.log('hello world')"]

  useEffect(() => {
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
