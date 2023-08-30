import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { parseJwt } from "../API/Authentication/parseJwt";
import { createWorkoutDay } from "../API/WorkoutDays/WorkoutDays";
import FetchAllExercises from "../Components/Exercises/FetchAllExercises";
import CreateWorkout from "../Components/Workout/CreateWorkout";
import FetchAllWorkouts from "../Components/Workout/FetchAllWorkouts";
import FetchExercisesInWorkout from "../Components/Workout/FetchExercisesInWorkout";
import FetchWorkoutByID from "../Components/Workout/FetchWorkoutByID";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Workout = () => {
  const [workout, setWorkout] = useState([]);
  const [workoutToggle, setWorkoutToggle] = useState(false);
  const [routineID, setRoutineID] = useState(Number);
  const [workoutCreated, setWorkoutCreated] = useState(false);
  const [toggleCreateWorkout, setToggleCreateWorkout] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState([
    { monday: false, value: 0 },
    { tuesday: false, value: 1 },
    { wednesday: false, value: 2 },
    { thursday: false, value: 3 },
    { friday: false, value: 4 },
    { saturday: false, value: 5 },
    { sunday: false, value: 6 },
  ]);

  const [createWorkoutDayData, setCreateWorkoutDayData] = useState({
    user_id: "",
    days_of_week: [],
    routine_id: 0,
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setCreateWorkoutDayData((prevState) => ({
      ...prevState,
      user_id: userID,
      routine_id: routineID,
    }));
  }, [workoutToggle]);

  const [createWorkoutDayToggle, setCreateWorkoutDayToggle] = useState(false);

  const daysOfWeekArray = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const createWorkoutToggle = () => {
    setToggleCreateWorkout((prevState) => !prevState);
  };

  useEffect(() => {
    setToggleCreateWorkout((prevState) => !prevState);
  }, [workoutToggle])

  const createDataForApiCall = () => {
    console.log("createDataForApiCall CALLED");
    const newWorkoutDays = dayOfWeek
      .filter((day) => day[daysOfWeekArray[day.value]]) // check if the boolean is true
      .map((day) => day.value); // create array with true values
    console.log("newWorkoutDays: ", newWorkoutDays);

    setCreateWorkoutDayData((prevData) => ({
      ...prevData,
      days_of_week: newWorkoutDays,
    }));
    setCreateWorkoutDayToggle((prevState) => !prevState);
    localStorage.setItem("hiddenState", true);

    toast.success(
      "Workout Schedule Created! Head to the homepage to see your workouts on the calendar",
      {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  console.log("createWorkoutDayData", createWorkoutDayData);

  useEffect(() => {
    createWorkoutDay(createWorkoutDayData)
      .then((response) => {
        console.log("Response: ", response);
      })
      .catch((err) => {
        console.log("createWorkoutDay API Call Failed", err);
      });
  }, [createWorkoutDayToggle]);

  const storedHiddenState = localStorage.getItem("hiddenState");
  const isButtonHidden = workout.length < 1 || storedHiddenState === "true";

  return (
    <div>
      <h3 className="pageHeader">Workout</h3>

      {/*<div className='fetchAllWorkouts'>
    <FetchAllWorkouts workoutToggle={workoutToggle}/>
  </div>*/}

      <div className="fetchWorkoutByID">
        <FetchWorkoutByID
          workoutToggle={workoutToggle}
          setRoutineID={setRoutineID}
          workoutCreated={workoutCreated}
          workout={workout}
          setWorkout={setWorkout}
        />
      </div>

      <div className="fetchExercisesInWorkout">
        <FetchExercisesInWorkout />
      </div>

      <MDBBtn onClick={createWorkoutToggle}>
        {toggleCreateWorkout ? "Hide Create Workout" : "Create Workout"}
      </MDBBtn>

      
        <div className={toggleCreateWorkout ? "createWorkout" : "hidden"}>
          <CreateWorkout
            setWorkoutToggle={setWorkoutToggle}
            workoutToggle={workoutToggle}
            routineID={routineID}
            setWorkoutCreated={setWorkoutCreated}
            setToggleCreateWorkout={setToggleCreateWorkout}
            setDayOfWeek={setDayOfWeek}
            dayOfWeek={dayOfWeek}
          />
        </div>
      

      <div className={isButtonHidden ? "hidden" : null}>
        <MDBBtn onClick={createDataForApiCall}> Finalise Days </MDBBtn>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Workout;
