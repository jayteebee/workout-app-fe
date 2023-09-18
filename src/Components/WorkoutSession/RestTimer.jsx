import React, { useEffect, useState } from "react";

const RestTimer = ({ restTimerExercise, startRestTimer, setStartRestTimer, count, setCount }) => {
  const [intervalId, setIntervalId] = useState(null);
  const [exercises, setExercises] = useState([]);
  console.log("exercises in rest", exercises);

  useEffect(() => {
    setExercises(restTimerExercise);
  }, [restTimerExercise]);

useEffect(() => {
let restTime = exercises.map((e) => (e.rest_timer))
console.log("restTime", restTime)
setCount(restTime[0])
}, [exercises])


  useEffect(() => {
    if (startRestTimer) {
      const id = setInterval(() => {
        setCount((prevState) => (prevState -= 1));
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
  }, [startRestTimer]);

  useEffect(() => {
    if (count === 0) {
      setStartRestTimer(false);
    }
  }, [count]);

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

      <h2>Rest: {formatTime(count)}</h2>

    </div>
  );
};

export default RestTimer;
