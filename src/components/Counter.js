import React, { useState, useEffect } from "react";
const Counter = ({ targetDate }) => {
  const [count, setCount] = useState(getRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(getRemainingTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function getRemainingTime() {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const remainingTime = target - now;

    if (remainingTime <= 0) {
      return "Countdown abgelaufen!";
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days} Tage, ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden`;
  }

  return (
      <div className="count">{count}</div>
  );
};

export default Counter;
