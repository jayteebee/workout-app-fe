import React, { useEffect } from "react";
import { useState } from "react";

const StopWatch = ({active, stopWatchCount, setStopWatchCount}) => {
  const [intervalId, setIntervalId] = useState(null); 

  useEffect(() => {

    if (active) {
      const id = setInterval(() => {
        setStopWatchCount((prevState) => (prevState += 1));
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
  
      <h2>Workout Timer: {formatTime(stopWatchCount)}</h2>

    </div>
  );
};

export default StopWatch;
