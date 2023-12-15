import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { parseJwt } from "../API/Authentication/parseJwt";
import {
  createWorkoutDay,
  frequency,
  getAllWorkoutDays,
} from "../API/WorkoutDays/WorkoutDays";
import FetchAllExercises from "../Components/Exercises/FetchAllExercises";
import CreateWorkout from "../Components/Workout/CreateWorkout";
import FetchAllWorkouts from "../Components/Workout/FetchAllWorkouts";
import FetchExercisesInWorkout from "../Components/Workout/FetchExercisesInWorkout";
import FetchWorkoutByID from "../Components/Workout/FetchWorkoutByID";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import {
  deleteWorkoutScheduleByID,
  getAllWorkoutSchedules,
} from "../API/WorkoutSchedule/WorkoutSchedule";

// this component manages creating the workout day data that is used to generate workout schedules

const Workout = ({
  weekly,
  custom,
  routineFrequency,
  activeRoutine,
  routineChange,
}) => {
// above props come from App
  const [workout, setWorkout] = useState([]);
  // console.log('workout', workout)
  const [workoutToggle, setWorkoutToggle] = useState(false);
  const [routineID, setRoutineID] = useState(Number);
  // console.log('routineID state', routineID)
  const [workoutCreated, setWorkoutCreated] = useState(false);
  const [toggleCreateWorkout, setToggleCreateWorkout] = useState(false);

  // used for the weekly frequent workoutDays api call
  // workoutDays api call triggers the workoutScheduleGenerator
  const [dayOfWeek, setDayOfWeek] = useState([
    { sunday: false, value: 0 },
    { monday: false, value: 1 },
    { tuesday: false, value: 2 },
    { wednesday: false, value: 3 },
    { thursday: false, value: 4 },
    { friday: false, value: 5 },
    { saturday: false, value: 6 },
  ]);
  // console.log('dayOfWeek', dayOfWeek)
  const [createWorkoutDayData, setCreateWorkoutDayData] = useState({
    user_id: "",
    days_of_week: [],
    routine_id: 0,
    frequency: null,
  });
  // console.log("createWorkoutDayData", createWorkoutDayData)

  const [createNewWorkout, setCreateNewWorkout] = useState(false);
  const [viewExistingWorkouts, setViewExistingWorkouts] = useState(false);
  const [workoutSchedules, setWorkoutSchedules] = useState([]);
  // console.log('workoutSchedules', workoutSchedules)
  const [logOfRoutineDaysOfWeek, setLogOfRoutineDaysOfWeek] = useState([]);
  // console.log('logOfRoutineDaysOfWeek', logOfRoutineDaysOfWeek)
  const [workoutDays, setWorkoutDays] = useState([]);

  const location = useLocation();
  // this comes from FetchAllRoutines.jsx
  const routineFrequencyExists = location.state?.routineFrequencyExists;
  const selectedRoutineID = location.state?.selectedRoutineID
//   console.log('routineFrequencyExists', routineFrequencyExists)
// console.log('routineFrequency', routineFrequency)
// console.log('selectedRoutineID', selectedRoutineID)


  useEffect(() => {
    // debugger;
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    // console.log('userID', userID, "routine id", routineID, "frequency", routineFrequencyExists)
    setCreateWorkoutDayData((prevState) => ({
      ...prevState,
      user_id: userID,
      routine_id: routineID,
      frequency: routineFrequencyExists,
    }));
  }, [workoutToggle, routineFrequencyExists]);

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
  }, [workoutToggle]);

  const createDataForCreateWorkoutDayApiCall = () => {
    // debugger;
    // console.log("createDataForCreateWorkoutDayApiCall CALLED");
    const newWorkoutDays = dayOfWeek
      .filter((day) => day[daysOfWeekArray[day.value]]) // check if the boolean is true
      .map((day) => day.value); // create array with true values
    // console.log("newWorkoutDays: ", newWorkoutDays);

    setCreateWorkoutDayData((prevData) => ({
      ...prevData,
      days_of_week: newWorkoutDays,
    }));
    setCreateWorkoutDayToggle((prevState) => !prevState);
    // localStorage.setItem("hiddenState", true);

    toast.success(
      "Workout Schedule Created! Head to the homepage to see your workouts on the calendar",
      {
        position: "bottom-center",
        autoClose: 3000,
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
    // debugger;
    // console.log("createWorkoutDayData in useEffect", createWorkoutDayData);
    if (createWorkoutDayData.user_id) {
      createWorkoutDay(createWorkoutDayData)
        .then((workoutDayData) => {
          setWorkoutDays(workoutDayData);
        })
        .catch((err) => {
          console.log("createWorkoutDay API Call Failed", err);
        });
    }
  }, [createWorkoutDayToggle]);

  const storedHiddenState = localStorage.getItem("hiddenState");
  const isButtonHidden = workout.length < 1 || storedHiddenState === "true";

  const customFrequencyWorkoutDaysAPICall = async () => {
    // debugger;
    // console.log('createWorkoutDayData in freq', createWorkoutDayData)
    await frequency(createWorkoutDayData)
      .then((response) => {
        // console.log("frequency Response: ", response);
      })
      .catch((err) => {
        console.log("customFrequencyWorkoutDaysAPICall Failed", err);
      });

    toast.success(
      "Workout Schedule Created! Head to the homepage to see your workouts on the calendar",
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

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

  useEffect(() => {
    if (workout.length === 0) {
      setViewExistingWorkouts(true);
    }
  }, []);

  useEffect(() => {
    getAllWorkoutSchedules()
      .then((data) => {
        setWorkoutSchedules(data);
      })
      .catch((err) =>
        console.log("Error with getAllWorkoutSchedules API Call: ", err)
      );

    getAllWorkoutDays()
      .then((workoutDayData) => {
        setWorkoutDays(workoutDayData);
      })
      .catch((err) =>
        console.log("Error with getAllWorkoutDays API Call: ", err)
      );
  }, []);

  const regenerateWorkoutDaysForRoutineChange = async (routineToChangeTo, rFreq) => {
    // debugger;

if (rFreq) {
  customFrequencyWorkoutDaysAPICall()
  return;
} else {
      let updatedDaysOfWeek = [];
    const workoutDaysArray = Array.isArray(workoutDays)
      ? workoutDays
      : [workoutDays];
    if (workoutDaysArray.length > 0 && routineToChangeTo) {
      let filteredWorkoutDays = workoutDaysArray.filter(
        (workoutDay) => workoutDay.routine_id === routineToChangeTo
      );
      updatedDaysOfWeek.push(filteredWorkoutDays[0].days_of_week);
    }
// console.log('routineToChangeTo', routineToChangeTo)
    setCreateWorkoutDayData((prevState) => ({
      ...prevState,
      routine_id: routineToChangeTo,
      days_of_week: updatedDaysOfWeek[0],
    }));
    setCreateWorkoutDayToggle((prevState) => !prevState);
}
  };

  const deleteWorkoutSchedules = async () => {
    // debugger;
    let arrOfWorkoutScheduleIds = [];
    if (workoutSchedules) {
      workoutSchedules.forEach((schedule) => {
        arrOfWorkoutScheduleIds.push(schedule.id);
      });
    }

    if (arrOfWorkoutScheduleIds.length > 0) {
      try {
        for (const workoutScheduleID of arrOfWorkoutScheduleIds) {
          await deleteWorkoutScheduleByID(workoutScheduleID);
        }
        console.log("deleted Workout Schedules!");
      } catch (err) {
        console.log("Error deleting workout schedules: ", err);
      }
    }
  };

  const routineChangeHandler = async (activeRoutineValue, rFreq) => {

    // debugger;
    // console.log('activeRoutineValue', activeRoutineValue, "rFreq", rFreq)
    try {
      await deleteWorkoutSchedules();
      regenerateWorkoutDaysForRoutineChange(activeRoutineValue, rFreq);
    } catch (err) {
      console.log("Error in routineChangeHandler", err);
    }
  };


  // manages the active routine feature, calls routine change handler at the bottom
  useEffect(() => {
    // console.log('routineChange', routineChange)
    // debugger;
    if (routineChange) {
    // console.log('activeRoutine', activeRoutine)
    if (activeRoutine) {
          setCreateWorkoutDayData((prevState) => ({
      ...prevState,
      routine_id: selectedRoutineID,
    }));
    }
// console.log('routineFrequencyExists', routineFrequencyExists)
    if (routineFrequencyExists) {
      setCreateWorkoutDayData((prevState) => ({
        ...prevState,
        frequency: routineFrequencyExists
      }));
    }

    if (workoutDays.length > 0 && workoutSchedules.length > 0 && activeRoutine) {
      routineChangeHandler(activeRoutine, routineFrequencyExists);
    }
    }

  }, [routineChange, activeRoutine, workoutDays, workoutSchedules, routineFrequencyExists]);

  return (
    <div className="grid-container">
      <h3 className="pageHeader workout">Workout</h3>

      {/*<div className='fetchAllWorkouts'>
    <FetchAllWorkouts workoutToggle={workoutToggle}/>
  </div>
<button onClick={() => routineChangeHandler(activeRoutine)}>both test</button>   */}

      <div className="workoutViewOptions">
        <MDBBtn
          color={createNewWorkout ? "info" : ""}
          name="createNewWorkout"
          onClick={handleWorkoutViewOptions}
        >
          Create New Workout
        </MDBBtn>

        <MDBBtn
          color={viewExistingWorkouts ? "info" : ""}
          name="viewExistingWorkouts"
          onClick={handleWorkoutViewOptions}
        >
          View Existing Workouts
        </MDBBtn>
      </div>

      <div
        className={
          viewExistingWorkouts && workout.length === 0 ? "noWorkouts" : "hidden"
        }
      >
        <p>No Workouts Created...</p>
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

      {/*<MDBBtn onClick={createWorkoutToggle}>
        {toggleCreateWorkout ? "Hide Create Workout" : "Create Workout"}
</MDBBtn> */}

      <div className={createNewWorkout ? "createWorkout" : "hidden"}>
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
          logOfRoutineDaysOfWeek={logOfRoutineDaysOfWeek}
          setLogOfRoutineDaysOfWeek={setLogOfRoutineDaysOfWeek}
        />
        {/*</div>*/}
      </div>

      <div className={createNewWorkout ? "finaliseDaysButtons" : "hidden"}>
        {/** These Two classes were rendered on the isButtonHidden being true as well */}

        <div
          className={
            routineFrequencyExists || workout.length < 1 ? "hidden" : null
          }
        >
          <MDBBtn onClick={createDataForCreateWorkoutDayApiCall}>
            Create Weekly Workout Schedule
          </MDBBtn>
        </div>

        <div
          className={
            routineFrequencyExists && workout.length > 0 ? "" : "hidden"
          }
        >
          <MDBBtn onClick={customFrequencyWorkoutDaysAPICall}>
            Create Custom Workout Schedule
          </MDBBtn>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Workout;
