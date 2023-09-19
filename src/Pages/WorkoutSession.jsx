import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StopWatch from "../Components/WorkoutSession/StopWatch";
import greenRhombus from "../CSS/Icons/GreenRhombus.png";
import redRhombus from "../CSS/Icons/redRhombus.png";
import purpleRhombus from "../CSS/Icons/purpleRhombus.png";
import RestTimer from "../Components/WorkoutSession/RestTimer";
import { ToastContainer, toast } from "react-toastify";

const WorkoutSession = () => {
  const [buttonColor, setButtonColor] = useState("green");
  // console.log("buttonColor", buttonColor);
  const [expandDiv, setExpandDiv] = useState(false);
  // console.log("expandDiv", expandDiv);
  const [id, setId] = useState(null);
  const [setsComplete, setSetsComplete] = useState(0);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const [active, setActive] = useState(false);
  const [startRestTimer, setStartRestTimer] = useState(false);
  const [restTimerExercise, setRestTimerExercise] = useState([])
  const [count, setCount] = useState(0);  


  const location = useLocation();
  const exercisesInWorkout = location.state?.exercisesInWorkout;
  // console.log("exercisesInWorkout", exercisesInWorkout);

  useEffect(() => {
    setId(exercisesInWorkout[0].id);
  }, [exercisesInWorkout]);

    const exerciseButton = (value, eID, sets) => {
        console.log("eID", eID)

          let restTimerExerciseFilter = exercisesInWorkout.filter(exercise =>  exercise.id === eID)
          console.log("restTimerExerciseFilter", restTimerExerciseFilter)


          if (value === "red" && exercisesCompleted === 0) {
            setActive(true);
          }

          if (value === "purple") {
            setSetsComplete((prevSetsComplete) => (prevSetsComplete += 1));
            setStartRestTimer(true)
          }

          value === "red" && setRestTimerExercise(restTimerExerciseFilter)

          if (sets === setsComplete) {
            value === "green" && setId(eID + 1);
            setSetsComplete(0);
            setExercisesCompleted(
              (prevExercisesCompleted) => (prevExercisesCompleted += 1)
            );
          }

          const numberOfExercises = exercisesInWorkout.length - 1;

          console.log("exercisesCompleted", exercisesCompleted, "numberOfExercises", numberOfExercises, "sets", sets, "setsComplete", setsComplete)
          if (exercisesCompleted === numberOfExercises && sets === setsComplete && value === "green") {
            toast.success("Workout Complete!!", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setActive(false);

            setExercisesCompleted(0);
          }

          setButtonColor(value);
  };

  const moreExerciseInfo = () => {
    setExpandDiv((prevState) => !prevState);
  };

  const workoutName = (
    <h2>Workout: {exercisesInWorkout[0].workout_name}</h2>
  );

  const displayWorkoutData = exercisesInWorkout.map((exercise, i) => (
    <div key={exercise.id} className="exerciseSession">
      <div className="exerciseInfo">
        <div style={{ width: "5%" }}>
          <p>
            {i + 1} {")"}
          </p>
        </div>

        <div
          className={
            expandDiv
              ? "exerciseSessionBorderExpanded"
              : "exerciseSessionBorder"
          }
          onClick={moreExerciseInfo}
        >
          <p>{exercise.exercise.name}</p>
          <p>Sets {exercise.sets}</p>
          <p>Reps {exercise.reps}</p>
        </div>

        {/* Green is to start the exercise, so when you're exercising, the button will be red 
when you tap the green button, a "setTimer" will be activated which will time how long each set takes
*/}
        {buttonColor === "green" && id === exercise.id ? (
          <button
            className="button"
            value={i}
            onClick={() => exerciseButton("red", exercise.id, exercise.sets)}
          >
            <img src={greenRhombus} alt="greenRhombus" className="rhombus" />
          </button>
        ) : null}
        {/* Pressing Red is to say you have finished the exercise, and will turn the button purple
whilst the button is red, the set timer will be running, when the red button is tapped to turn to purple, the set timer will stop
*/}
        {buttonColor === "red" && id === exercise.id ? (
          <button
            className="button"
            onClick={() => exerciseButton("purple", exercise.id, exercise.sets)}
          >
            <img src={redRhombus} alt="redRhombus" className="rhombus" />
          </button>
        ) : null}
        {/* Purple will show the rest timer counting down, and when it hits 0, the green button is triggered */}
        {buttonColor === "purple" && id === exercise.id ? (
          <button
            className="button"
            {...count === 0 && exerciseButton("green", exercise.id, exercise.sets)}
          >
            <img src={purpleRhombus} alt="purpleRhombus" className="rhombus" />
          </button>
        ) : null}
      </div>
    </div>
  ));

  // console.log("displayWorkoutData", displayWorkoutData);

  return (
    <div>
      <StopWatch active={active} />
      <RestTimer 
      restTimerExercise={restTimerExercise}
      startRestTimer={startRestTimer}
      setStartRestTimer={setStartRestTimer}
      count={count}
      setCount={setCount}
      />
      {workoutName}
      {displayWorkoutData}
      <ToastContainer />
    </div>
  );
};

export default WorkoutSession;
