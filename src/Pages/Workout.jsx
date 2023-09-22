import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { parseJwt } from "../API/Authentication/parseJwt";
import { createWorkoutDay, frequency } from "../API/WorkoutDays/WorkoutDays";
import FetchAllExercises from "../Components/Exercises/FetchAllExercises";
import CreateWorkout from "../Components/Workout/CreateWorkout";
import FetchAllWorkouts from "../Components/Workout/FetchAllWorkouts";
import FetchExercisesInWorkout from "../Components/Workout/FetchExercisesInWorkout";
import FetchWorkoutByID from "../Components/Workout/FetchWorkoutByID";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Workout = ({weekly, custom, routineFrequency}) => {
  const [workout, setWorkout] = useState([]);
  const [workoutToggle, setWorkoutToggle] = useState(false);
  const [routineID, setRoutineID] = useState(Number);
  const [workoutCreated, setWorkoutCreated] = useState(false);
  const [toggleCreateWorkout, setToggleCreateWorkout] = useState(false);
  // const [dayOfWeek, setDayOfWeek] = useState([
  //   { monday: false, value: 0 },
  //   { tuesday: false, value: 1 },
  //   { wednesday: false, value: 2 },
  //   { thursday: false, value: 3 },
  //   { friday: false, value: 4 },
  //   { saturday: false, value: 5 },
  //   { sunday: false, value: 6 },
  // ]);
  const [dayOfWeek, setDayOfWeek] = useState([
    { sunday: false, value: 0 },
    { monday: false, value: 1 },
    { tuesday: false, value: 2 },
    { wednesday: false, value: 3 },
    { thursday: false, value: 4 },
    { friday: false, value: 5 },
    { saturday: false, value: 6 },
  ]);

  const [createWorkoutDayData, setCreateWorkoutDayData] = useState({
    user_id: "",
    days_of_week: [],
    routine_id: 0,
    frequency: null
  });
// console.log("createWorkoutDayData", createWorkoutDayData)

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setCreateWorkoutDayData((prevState) => ({
      ...prevState,
      user_id: userID,
      routine_id: routineID,
      frequency: routineFrequency
    }));
  }, [workoutToggle]);

  const [createWorkoutDayToggle, setCreateWorkoutDayToggle] = useState(false);

  // const daysOfWeekArray = [
  //   "monday",
  //   "tuesday",
  //   "wednesday",
  //   "thursday",
  //   "friday",
  //   "saturday",
  //   "sunday",
  // ];

  const daysOfWeekArray = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  
// used for conditionally rendering the createWorkout Button
  const createWorkoutToggle = () => {
    setToggleCreateWorkout((prevState) => !prevState);
  };

  // used for conditionally rendering the createWorkout form after it has been filled out and submitted
  useEffect(() => {
    setToggleCreateWorkout((prevState) => !prevState);
  }, [workoutToggle])

  const createDataForCreateWorkoutDayApiCall = () => {
    // console.log("createDataForCreateWorkoutDayApiCall CALLED");
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

  // console.log("createWorkoutDayData", createWorkoutDayData);

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

const customFrequencyWorkoutDaysAPICall = async () => {
 await frequency(createWorkoutDayData)
  .then((response) => {
    console.log("Response: ", response);
  })
  .catch((err) => {
    console.log("customFrequencyWorkoutDaysAPICall Failed", err);
  });

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

}

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
            weekly={weekly}
            custom={custom}
          />
        </div>
      

      <div className={isButtonHidden || custom ? "hidden" : null}>
        <MDBBtn onClick={createDataForCreateWorkoutDayApiCall}> Finalise Days </MDBBtn>
      </div>

      <div className={isButtonHidden || weekly ? "hidden" : null}>
      <MDBBtn onClick={customFrequencyWorkoutDaysAPICall} >Finalise Custom Days</MDBBtn>
      </div>

      <ToastContainer />

    </div>
  );
};

export default Workout;
