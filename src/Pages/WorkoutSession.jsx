import React, { useEffect, useState } from "react";
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

const WorkoutSession = () => {
  const [buttonColor, setButtonColor] = useState("green");
  const [stopWatchCount, setStopWatchCount] = useState(0);
  // console.log("buttonColor", buttonColor);
  const [expandDiv, setExpandDiv] = useState(false);
  // console.log("expandDiv", expandDiv);
  const [id, setId] = useState(null);
  const [setsComplete, setSetsComplete] = useState(0);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const [active, setActive] = useState(false);
  const [startRestTimer, setStartRestTimer] = useState(false);
  const [restTimerExercise, setRestTimerExercise] = useState([]);
  const [count, setCount] = useState(0);
  const [userID, setUserID] = useState(null);
  const [workoutSession, setWorkoutSession] = useState([]);
  // console.log("workoutSession", workoutSession)
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
  // console.log("exerciseSessionData", exerciseSessionData)
  const [metricForm, setMetricForm] = useState(false);
  // console.log("metricForm", metricForm)
  const [currentExerciseButton, setCurrentExerciseButton] = useState({});
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [setTimer, setSetTimer] = useState(false);
  const [setTimerCount, setSetTimerCount] = useState(0);

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
  const exercisesInWorkout = location.state?.exercisesInWorkout;
  // console.log("exercisesInWorkout", exercisesInWorkout);
  const routineWorkoutID = location.state?.rwID;

  const [workoutSessionData, setWorkoutSessionData] = useState({
    user_id: null,
    routine_workout_id: routineWorkoutID,
    date: new Date(),
  });
  // console.log("workoutSessionData", workoutSessionData)

  useEffect(() => {
    setId(exercisesInWorkout[0].id);
  }, [exercisesInWorkout]);

  const exerciseButton = (value, eID, sets) => {
    setCurrentExerciseButton({
      value: value,
      eID: eID,
      sets: sets,
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

    // console.log("sets", sets, "setsComplete", setsComplete, "ID state", id, "eID", eID, "exercisesCompleted", exercisesCompleted)

    if (value === "purple") {
      setSetsComplete((prevSetsComplete) => (prevSetsComplete += 1));
      setStartRestTimer(true);
      setMetricForm(true);
      setSetTimer(false);
    }

    if (value === "red") {
      setRestTimerExercise(restTimerExerciseFilter);
      setSetTimer(true);
    }


    setButtonColor(value);
  };

  // if (setTimerCount > 0 && setTimer === false) {
  //   console.log("Great success")
  //   }

  const moreExerciseInfo = () => {
    setExpandDiv((prevState) => !prevState);
  };

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
    setExerciseSessionData({
      workout_session_id: workoutSession.id,
      exercise_id: id,
      sets_completed: setsComplete,
      reps_completed: repsAchieved,
      weight_used: weightAchieved,
      set_timer: setTimerCount,
    });
  }, [weightAchieved, setsComplete, repsAchieved, id, setTimerCount]);

  const handleWeightAndRepsSubmit = (e) => {
    e.preventDefault();
    // console.log("EX SESH DATA", exerciseSessionData)
    createExerciseSession(exerciseSessionData)
      .then((data) => console.log("Data:", data))
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
    setSetTimerCount(0);
  };

  const workoutSessionId = workoutSession.id;

  useEffect(() => {
    if (workoutSessionId) {
      editWorkoutSessionByID(workoutSessionId, {
        total_duration: stopWatchCount,
      });
    }
  }, [workoutComplete]);

  useEffect(() => {
    if (workoutSession.total_duration > 0) {
      createSessionLogs(workoutSession).then((data) =>
        console.log("dayter", data)
      );
    }
  }, [workoutComplete]);

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
          <p>Weight: {exercise.weight}kg</p>
        </div>

        {buttonColor === "green" && id === exercise.id ? (
          <button
            className="button"
            value={i}
            onClick={() => exerciseButton("red", exercise.id, exercise.sets)}
          >
            <img src={greenRhombus} alt="greenRhombus" className="rhombus" />
          </button>
        ) : null}

        {buttonColor === "red" && id === exercise.id ? (
          <button
            className="button"
            onClick={() => exerciseButton("purple", exercise.id, exercise.sets)}
          >
            <img src={redRhombus} alt="redRhombus" className="rhombus" />
          </button>
        ) : null}

        {buttonColor === "purple" && id === exercise.id ? (
          <button
            className="button"
            {...(count === 0 &&
              exerciseButton("green", exercise.id, exercise.sets))}
          >
            <img src={purpleRhombus} alt="purpleRhombus" className="rhombus" />
          </button>
        ) : null}

        {(buttonColor === "purple" || buttonColor === "green") &&
          setsComplete > 0 &&
          id === exercise.id &&
          metricForm && (
            <div>
              <form onSubmit={handleWeightAndRepsSubmit}>
                <MDBInput
                  placeholder="Reps Achieved"
                  value={repsAchieved}
                  name="reps"
                  onChange={updateExerciseMetrics}
                ></MDBInput>

                <MDBInput
                  placeholder="Weight Achieved"
                  value={weightAchieved}
                  name="weight"
                  onChange={updateExerciseMetrics}
                ></MDBInput>
                <MDBBtn type="submit">Log Weight and Reps</MDBBtn>
              </form>
            </div>
          )}
      </div>
    </div>
  ));

  // console.log("displayWorkoutData", displayWorkoutData);

  return (
    <div>
      <StopWatch
        active={active}
        stopWatchCount={stopWatchCount}
        setStopWatchCount={setStopWatchCount}
      />
      <RestTimer
        restTimerExercise={restTimerExercise}
        startRestTimer={startRestTimer}
        setStartRestTimer={setStartRestTimer}
        count={count}
        setCount={setCount}
      />
      <SetTimer
        setTimer={setTimer}
        setSetTimerCount={setSetTimerCount}
        setTimerCount={setTimerCount}
      />
      {workoutName}
      {displayWorkoutData}
      <ToastContainer />
    </div>
  );
};

export default WorkoutSession;



// insert in line 122/123

    // if (sets === setsComplete && metricForm === false ) {
    //   setId(eID + 1);
    //   setSetsComplete(0);
    //   setExercisesCompleted(
    //     (prevExercisesCompleted) => (prevExercisesCompleted += 1)
    //   );
    // }

    // const numberOfExercises = exercisesInWorkout.length - 1;

    // if (exercisesCompleted === numberOfExercises && sets === setsComplete && value === "green" && metricForm === false) {
    //   setWorkoutComplete(true)
    //   toast.success("Workout Complete!!", {
    //     position: "bottom-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    //   setActive(false);

    //   setExercisesCompleted(0);
    // }
