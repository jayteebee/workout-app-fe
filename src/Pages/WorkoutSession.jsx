import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StopWatch from "../Components/WorkoutSession/StopWatch";
import greenRhombus from "../CSS/Icons/GreenRhombus.png";
import redRhombus from "../CSS/Icons/redRhombus.png";
import purpleRhombus from "../CSS/Icons/purpleRhombus.png";
import RestTimer from "../Components/WorkoutSession/RestTimer";
import { ToastContainer, toast } from "react-toastify";
import {
  createWorkoutSession,
  editWorkoutSessionByID,
} from "../API/WorkoutSession/WorkoutSession";
import { parseJwt } from "../API/Authentication/parseJwt";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { createExerciseSession } from "../API/ExerciseSession/ExerciseSession";
import { createSessionLogs } from "../API/SessionLogs/SessionLogs";
import SetTimer from "../Components/WorkoutSession/SetTimer";
import "../CSS/WorkoutSession.css";
import { WorkoutContext } from "../Context/WorkoutContext";
import { IntroJsContext } from "../Context/IntroJsContext";
import { Steps } from "intro.js-react";

// takes a user through the workout set by set, logs final outcomes via exercise/workout_Sesssion to the logs component

const WorkoutSession = () => {
  const [buttonColor, setButtonColor] = useState("green");
  const [stopWatchCount, setStopWatchCount] = useState(0);
  const [expandDiv, setExpandDiv] = useState(false);
  const [id, setId] = useState(null);
  const [setsComplete, setSetsComplete] = useState(0);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const [active, setActive] = useState(false);
  const [startRestTimer, setStartRestTimer] = useState(false);
  const [restTimerExercise, setRestTimerExercise] = useState([]);
  const [count, setCount] = useState(0);
  const [userID, setUserID] = useState(null);
  const [workoutSession, setWorkoutSession] = useState([]);
  const [repsAchieved, setRepsAchieved] = useState(0);
  const [weightAchieved, setWeightAchieved] = useState(0);
  const [exerciseSessionData, setExerciseSessionData] = useState({
    workout_session_id: workoutSession.id,
    exercise_id: id,
    sets_completed: setsComplete,
    reps_completed: repsAchieved,
    weight_used: weightAchieved,
    set_timer: 0,
  });
  const [metricForm, setMetricForm] = useState(false);
  const [currentExerciseButton, setCurrentExerciseButton] = useState({});
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [setTimer, setSetTimer] = useState(false);
  const [setTimerCount, setSetTimerCount] = useState(0);

  const { steps, stepsEnabled, initialStep, onExit, setInitialStep, setStepsEnabled} = useContext(IntroJsContext)


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setUserID(userID);
  }, []);

  useEffect(() => {
    setWorkoutSessionData((prevData) => ({
      ...prevData,
      user_id: userID,
    }));
  }, [userID]);

  const location = useLocation();
  // const exercisesInWorkout = location.state?.exercisesInWorkout;
  const {exercisesInWorkout, setExercisesInWorkout} = useContext(WorkoutContext)
  // console.log('exercisesInWorkout',exercisesInWorkout)

  // const workoutName = <h2>Workout: {exercisesInWorkout[0].workout_name}</h2>;

  // console.log("exercisesInWorkout", exercisesInWorkout);
  const routineWorkoutID = location.state?.rwID;

  const [workoutSessionData, setWorkoutSessionData] = useState({
    user_id: null,
    routine_workout_id: routineWorkoutID,
    date: new Date(),
    workout_name: "",
  });

useEffect(() => {
  if (exercisesInWorkout) {
    setWorkoutSessionData((prevData) => ({
      ...prevData,
      workout_name: exercisesInWorkout[0].workout_name
    }))
  }
}, [exercisesInWorkout])

  useEffect(() => {
    setId(exercisesInWorkout[0].id);
  }, [exercisesInWorkout]);

  const exerciseButton = (value, eID, sets, exerciseID, exerciseName) => {
    setCurrentExerciseButton({
      value: value,
      eID: eID,
      sets: sets,
      exerciseID: exerciseID,
      exerciseName: exerciseName
    });

    let restTimerExerciseFilter = exercisesInWorkout.filter(
      (exercise) => exercise.id === eID
    );

    if (value === "red" && setsComplete === 0 && exercisesCompleted === 0) {
      createWorkoutSession(workoutSessionData)
        .then((data) => {
          setWorkoutSession(data);
          console.log("response:", data);
        })
        .catch((err) =>
          console.log("createWorkoutSession API Call Failed:", err)
        );
    }

    if (value === "red" && exercisesCompleted === 0) {
      setActive(true);
    }

    if (value === "purple") {
      setSetsComplete((prevSetsComplete) => (prevSetsComplete += 1));
      setStartRestTimer(true);
      setMetricForm(true);
      setSetTimer(false);
    setExpandDiv(true);
    }

    if (value === "red") {
      setRestTimerExercise(restTimerExerciseFilter);
      setSetTimer(true);
    }

    setButtonColor(value);
  };

  // const moreExerciseInfo = () => {
  //   setExpandDiv(true);
  // };

  const workoutName = <h2>Workout: {exercisesInWorkout[0].workout_name}</h2>;

  const updateExerciseMetrics = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "reps") {
      setRepsAchieved(value);
    }
    if (name === "weight") {
      setWeightAchieved(value);
    }
  };

  useEffect(() => {
    const { value, eID, sets, exerciseID, exerciseName } = currentExerciseButton;
    setExerciseSessionData({
      workout_session_id: workoutSession.id,
      exercise_id: exerciseID,
      sets_completed: setsComplete,
      reps_completed: repsAchieved,
      weight_used: weightAchieved,
      set_timer: setTimerCount,
      exercise_name: exerciseName
    });
  }, [weightAchieved, setsComplete, repsAchieved, id, setTimerCount]);

  const handleWeightAndRepsSubmit = (e) => {
    e.preventDefault();
    createExerciseSession(exerciseSessionData)
      .then((data) => data)
      .catch((err) =>
        console.log("Error with createExerciseSession API Call:", err)
      );
    setMetricForm(false);

    const { value, eID, sets } = currentExerciseButton;

    if (sets === setsComplete) {
      setId(eID + 1);
      setSetsComplete(0);
      setExercisesCompleted(
        (prevExercisesCompleted) => (prevExercisesCompleted += 1)
      );
    }

    const numberOfExercises = exercisesInWorkout.length - 1;

    if (
      exercisesCompleted === numberOfExercises &&
      sets === setsComplete &&
      (value === "green" || "purple")
    ) {
      setWorkoutComplete(true);
      toast.success("Workout Complete. Head to the Logs page to see your data.", {
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
    setSetTimerCount(0);
    setExpandDiv(false);

  };

  const workoutSessionId = workoutSession.id;

  useEffect(() => {
    if (workoutSessionId) {
      editWorkoutSessionByID(workoutSessionId, {
        total_duration: stopWatchCount,
      workout_name: exercisesInWorkout[0].workout_name
      });
    }

  }, [workoutComplete]);

  useEffect(() => {
    if (workoutSession.total_duration > 0) {
      createSessionLogs(workoutSession)
      .then((data) =>
        console.log("data", data),
        // console.log('SessionLogsCREATED')
      );
    }
  }, [workoutComplete]);


  const displayWorkoutData = exercisesInWorkout.map((exercise, i) => (
    <div key={exercise.id} className="exerciseSessionContainer" id="exerciseSessionContainerForTutorial">
      
        <div style={{ width: "5%" }} className="exerciseOrder">
          <p>{i + 1} .</p>
        </div>

        <div
          className={
            expandDiv && id === exercise.id
              ? "exerciseSessionBorderExpanded"
              : "exerciseSessionBorder"
          }
          // onClick={moreExerciseInfo}
         >

        <div className="exerciseDetails">
          <p>{exercise.exercise.name}</p>
          <p>S {exercise.sets}</p>
          <p>R {exercise.reps}</p>
          <p>Weight: {exercise.weight}kg</p>

          {buttonColor === "green" && id === exercise.id ? (
            <button
              className="button"
              value={i}
              title="Start Set"
              onClick={() =>
                exerciseButton(
                  "red",
                  exercise.id,
                  exercise.sets,
                  exercise.exercise.id,
                  exercise.exercise.name
                )
              }
            >
              <img src={greenRhombus} alt="greenRhombus" className="rhombus" />
            </button>
          ) : null}

          {buttonColor === "red" && id === exercise.id ? (
            <button
              className="button"
              title="Finish Set"
              onClick={() =>
                exerciseButton(
                  "purple",
                  exercise.id,
                  exercise.sets,
                  exercise.exercise.id,
                  exercise.exercise.name
                )
              }
            >
              <img src={redRhombus} alt="redRhombus" className="rhombus" />
            </button>
          ) : null}

          {buttonColor === "purple" && id === exercise.id ? (
            <button
              className="button"
              title="Resting"
              {...(count === 0 &&
                exerciseButton(
                  "green",
                  exercise.id,
                  exercise.sets,
                  exercise.exercise.id,
                  exercise.exercise.name
                ))}
            >
              <img
                src={purpleRhombus}
                alt="purpleRhombus"
                className="rhombus"
              />
            </button>
          ) : null}
          
          </div>

          
          {(buttonColor === "purple" || buttonColor === "green") &&
            setsComplete > 0 &&
            id === exercise.id &&
            metricForm && expandDiv && (
              <div>
                <form
                  className="metricForm"
                  onSubmit={handleWeightAndRepsSubmit}
                >
                  <div className="inline-inputs">
                    <MDBInput
                      className="metricFormInput"
                      contrast
                      label="Reps Achieved"
                      value={repsAchieved}
                      name="reps"
                      onChange={updateExerciseMetrics}
                    ></MDBInput>

                    <MDBInput
                      className="metricFormInput"
                      contrast
                      label="Weight Achieved"
                      value={weightAchieved}
                      name="weight"
                      onChange={updateExerciseMetrics}
                    ></MDBInput>
                  </div>
                  <div className="button-container">
                    <MDBBtn type="submit">Log Weight and Reps</MDBBtn>
                  </div>
                </form>
              </div>
            )}
            </div>
    </div>
  ));

  return (
    <div className="grid-container">
      <div className="stopWatch">
        <StopWatch
          active={active}
          stopWatchCount={stopWatchCount}
          setStopWatchCount={setStopWatchCount}
        />
      </div>

      <div className={startRestTimer ? "restTimer" : "hidden"}>
        <RestTimer
          restTimerExercise={restTimerExercise}
          startRestTimer={startRestTimer}
          setStartRestTimer={setStartRestTimer}
          count={count}
          setCount={setCount}
        />
      </div>

      <div className={ setTimer ? "setTimer" : "hidden"}>
        <SetTimer
          setTimer={setTimer}
          setSetTimerCount={setSetTimerCount}
          setTimerCount={setTimerCount}
        />
      </div>

      <div className="workoutName">{workoutName}</div>

      <div className="displayWorkoutData">{displayWorkoutData}</div>

      <ToastContainer />

      <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={initialStep}
      onExit={onExit}
    />
    </div>
  );
};

export default WorkoutSession;