import { MDBBtn } from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import { parseJwt } from "../API/Authentication/parseJwt";
import {
  createWorkoutDay,
  frequency,
  getAllWorkoutDays,
} from "../API/WorkoutDays/WorkoutDays";
import CreateWorkout from "../Components/Workout/CreateWorkout";
import FetchExercisesInWorkout from "../Components/Workout/FetchExercisesInWorkout";
import FetchWorkoutByID from "../Components/Workout/FetchWorkoutByID";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  deleteWorkoutScheduleByID,
  getAllWorkoutSchedules,
} from "../API/WorkoutSchedule/WorkoutSchedule";
import { RoutineAndWorkoutDataContext } from "../Context/RoutineAndWorkoutDataContext";
import { IntroJsContext } from "../Context/IntroJsContext";
import { Steps } from "intro.js-react";

// this component manages creating the workout day data that is used to generate workout schedules

const Workout = ({
  weekly,
  routineFrequency,
  activeRoutine,
  routineChange,
}) => {
  const [workout, setWorkout] = useState([]);
  const [workoutToggle, setWorkoutToggle] = useState(false);
  const [routineID, setRoutineID] = useState(Number);
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

  const [createWorkoutDayData, setCreateWorkoutDayData] = useState({
    user_id: "",
    days_of_week: [],
    routine_id: 0,
    frequency: null,
  });

  const [createNewWorkout, setCreateNewWorkout] = useState(false);
  const [viewExistingWorkouts, setViewExistingWorkouts] = useState(false);
  const [workoutSchedules, setWorkoutSchedules] = useState([]);
  const [logOfRoutineDaysOfWeek, setLogOfRoutineDaysOfWeek] = useState([]);
  const [workoutDays, setWorkoutDays] = useState([]);

  const { managingRoutineAndWorkoutData } = useContext(RoutineAndWorkoutDataContext);
  const {  steps, stepsEnabled, initialStep, onExit, setInitialStep, setStepsEnabled} = useContext(IntroJsContext)

  const routineFrequencyExists =
    managingRoutineAndWorkoutData.routineFrequencyExists;

  const selectedRoutineID = managingRoutineAndWorkoutData.selectedRoutineID;

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;

    setCreateWorkoutDayData((prevState) => ({
      ...prevState,
      user_id: userID,
      routine_id: routineID,
      frequency: routineFrequencyExists,
    }));
  }, [workoutToggle, routineFrequencyExists]);

  const [createWorkoutDayToggle, setCreateWorkoutDayToggle] = useState(false);

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
    const newWorkoutDays = dayOfWeek
      .filter((day) => day[daysOfWeekArray[day.value]]) // check if the boolean is true
      .map((day) => day.value); // create array with true values

    setCreateWorkoutDayData((prevData) => ({
      ...prevData,
      days_of_week: newWorkoutDays,
    }));
    setCreateWorkoutDayToggle((prevState) => !prevState);

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

  useEffect(() => {
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
    await frequency(createWorkoutDayData)
      .then((response) => {})
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
      if (initialStep === 8) {
        setTimeout(() => {
          setStepsEnabled(false); 
          setInitialStep(9)
          setStepsEnabled(true)
        }, 1000)
      }
    }
  };

  useEffect(() => {
    if (workout.length === 0) {
      setCreateNewWorkout(true);
      setViewExistingWorkouts(false);
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

  const regenerateWorkoutDaysForRoutineChange = async (
    routineToChangeTo,
    rFreq
  ) => {
    if (rFreq) {
      customFrequencyWorkoutDaysAPICall();
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

      setCreateWorkoutDayData((prevState) => ({
        ...prevState,
        routine_id: routineToChangeTo,
        days_of_week: updatedDaysOfWeek[0],
      }));
      setCreateWorkoutDayToggle((prevState) => !prevState);
    }
  };

  const deleteWorkoutSchedules = async () => {
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
    try {
      await deleteWorkoutSchedules();
      regenerateWorkoutDaysForRoutineChange(activeRoutineValue, rFreq);
    } catch (err) {
      console.log("Error in routineChangeHandler", err);
    }
  };

  // manages the active routine feature, calls routine change handler at the bottom
  useEffect(() => {
    if (routineChange) {
      if (activeRoutine) {
        setCreateWorkoutDayData((prevState) => ({
          ...prevState,
          routine_id: selectedRoutineID,
        }));
      }

      if (routineFrequencyExists) {
        setCreateWorkoutDayData((prevState) => ({
          ...prevState,
          frequency: routineFrequencyExists,
        }));
      }

      if (
        workoutDays.length > 0 &&
        workoutSchedules.length > 0 &&
        activeRoutine
      ) {
        routineChangeHandler(activeRoutine, routineFrequencyExists);
      }
    }
  }, [
    routineChange,
    activeRoutine,
    workoutDays,
    workoutSchedules,
    routineFrequencyExists,
  ]);

  return (
    <div className="grid-container">
      <h3 className="pageHeader workout">Workout</h3>

      <div className="workoutViewOptions">
        <MDBBtn
          color={createNewWorkout ? "info" : ""}
          name="createNewWorkout"
          onClick={handleWorkoutViewOptions}
        >
          Create New Workout
        </MDBBtn>

        <MDBBtn
        id="viewExistingWorkoutsForTutorial"
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

      <div className={createNewWorkout ? "createWorkout" : "hidden"}>
        <CreateWorkout
          setWorkoutToggle={setWorkoutToggle}
          workoutToggle={workoutToggle}
          routineID={routineID}
          setWorkoutCreated={setWorkoutCreated}
          setToggleCreateWorkout={setToggleCreateWorkout}
          setDayOfWeek={setDayOfWeek}
          dayOfWeek={dayOfWeek}
          weekly={weekly}
          logOfRoutineDaysOfWeek={logOfRoutineDaysOfWeek}
          setLogOfRoutineDaysOfWeek={setLogOfRoutineDaysOfWeek}
        />
      </div>

      <div id="scheduleWorkoutsForTutorial" className={createNewWorkout ? "finaliseDaysButtons" : "hidden"}
      onClick={() => {
        if (initialStep === 7) {
          setTimeout(() => {
            setStepsEnabled(false); 
            setInitialStep(8)
            setStepsEnabled(true)
          }, 1000)
        }
      }}
      >
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

      <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={initialStep}
      onExit={onExit}
    />
    </div>
  );
};

export default Workout;
