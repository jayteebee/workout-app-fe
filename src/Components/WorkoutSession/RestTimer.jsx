import React, { useEffect, useState } from "react";

const RestTimer = ({ restTimerExercise }) => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [exercises, setExercises] = useState(null);
  console.log("exercises in rest", exercises);

  useEffect(() => {
    setExercises(restTimerExercise);
  }, [restTimerExercise]);

  useEffect(() => {
    if (active) {
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
  }, [active]);

  return (
    <div>
      <h2>rest timer</h2>
    </div>
  );
};

export default RestTimer;
