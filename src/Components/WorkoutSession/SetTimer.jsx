import React, { useEffect, useState } from 'react'

const SetTimer = ({setTimer, setSetTimerCount, setTimerCount}) => {
    // console.log("setTimer", setTimer)
  const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (setTimer) {
          const id = setInterval(() => {
            setSetTimerCount((prevState) => (prevState += 1));
          }, 1000);
          setIntervalId(id);
        } else {
          clearInterval(intervalId);
        }
        
        return () => {
          if (intervalId) {
            clearInterval(intervalId);
          }
        };
      }, [setTimer]);

      const formatTime = (seconds) => {
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(
          2,
          "0"
        )}:${String(remainingSeconds).padStart(2, "0")}`;
      };

  return (
    <div>
    <h2>Set Timer: {formatTime(setTimerCount)}</h2> 
    
    </div>
  )
}

export default SetTimer