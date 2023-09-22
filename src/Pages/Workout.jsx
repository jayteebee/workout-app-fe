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
import { useLocation } from "react-router-dom";


const Workout = ({weekly, custom, routineFrequency}) => {
  const [workout, setWorkout] = useState([]);
  const [workoutToggle, setWorkoutToggle] = useState(false);
  const [routineID, setRoutineID] = useState(Number);
  const [workoutCreated, setWorkoutCreated] = useState(false);
  const [toggleCreateWorkout, setToggleCreateWorkout] = useState(false);

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

const [createNewWorkout, setCreateNewWorkout] = useState(false)
const [viewExistingWorkouts, setViewExistingWorkouts] = useState(false)


const location = useLocation();
  const routineFrequencyExists = location.state?.routineFrequencyExists;
console.log('routineFrequencyExists', routineFrequencyExists)

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
    if (createWorkoutDayData > 0) {
       createWorkoutDay(createWorkoutDayData)
      .then((response) => {
        console.log("Response: ", response);
      })
      .catch((err) => {
        console.log("createWorkoutDay API Call Failed", err);
      });
    }
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

const handleWorkoutViewOptions = (e) => {
  let name = e.target.name;
  if (name === "createNewWorkout") {
    setViewExistingWorkouts(false);
    setCreateNewWorkout(true);
  }
  if (name === "viewExistingWorkouts") {
    setCreateNewWorkout(false);
    setViewExistingWorkouts(true);
  }
};

  return (
    <div className="grid-container">
      <h3 className="pageHeader workout">Workout</h3>

      {/*<div className='fetchAllWorkouts'>
    <FetchAllWorkouts workoutToggle={workoutToggle}/>
  </div>*/}

  <div className="workoutViewOptions">
  <MDBBtn name="createNewWorkout" onClick={handleWorkoutViewOptions}>
    Create New Workout
  </MDBBtn>

  <MDBBtn name="viewExistingWorkouts" onClick={handleWorkoutViewOptions}>
    View Existing Workouts
  </MDBBtn>
</div>

      <div className={createNewWorkout ? "hidden" : "fetchWorkoutByID"}>
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

      { /*<MDBBtn onClick={createWorkoutToggle}>
        {toggleCreateWorkout ? "Hide Create Workout" : "Create Workout"}
</MDBBtn> */}

      <div className={createNewWorkout ? "createWorkout" : "hidden"} >
        {/*<div className={toggleCreateWorkout ? "createWorkout" : "hidden"}>*/}
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
        {/*</div>*/}
      </div>

      <div className={viewExistingWorkouts ? "hidden" : "finaliseDaysButtons"}> 
      {/** These Two classes were rendered on the isButtonHidden being true as well */}
      <div className={routineFrequencyExists ? "hidden" : null}>
        <MDBBtn onClick={createDataForCreateWorkoutDayApiCall}> Finalise Days </MDBBtn>
      </div>

      <div className={routineFrequencyExists  ? "" : "hidden"}>
      <MDBBtn onClick={customFrequencyWorkoutDaysAPICall} >Finalise Custom Days</MDBBtn>
      </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default Workout;
