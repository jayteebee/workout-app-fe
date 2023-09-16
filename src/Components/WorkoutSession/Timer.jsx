import React, { useEffect } from "react";
import { useState } from "react";

const Timer = () => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null); 

  useEffect(() => {

    if (active) {
      const id = setInterval(() => {
        setCount((prevState) => (prevState += 1));
      }, 1000);
      setIntervalId(id)
    } else {
      clearInterval(intervalId);
    }

    return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };

  }, [active]);

  // Function to format seconds as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };


  return (
    <div>
      <button
        onClick={() => {
          setActive(true);
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          setActive(false);
        }}
      >
        Stop
      </button>
      <div>Workout Timer: {formatTime(count)}</div>

    </div>
  );
};

export default Timer;
