import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import FetchAllExercises from "../Components/Exercises/FetchAllExercises";
import CreateWorkout from "../Components/Workout/CreateWorkout";
import FetchAllWorkouts from "../Components/Workout/FetchAllWorkouts";
import FetchExercisesInWorkout from "../Components/Workout/FetchExercisesInWorkout";
import FetchWorkoutByID from "../Components/Workout/FetchWorkoutByID";

const Workout = () => {
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


  const createWorkoutToggle = () => {
    setToggleCreateWorkout((prevState) => !prevState);
  };

// useEffect(() => {
//   setToggleCreateWorkout((prevState) => !prevState);
// }, [workoutToggle])

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
        />
      </div>

      <div className="fetchExercisesInWorkout">
        <FetchExercisesInWorkout />
      </div>

      <MDBBtn onClick={createWorkoutToggle}>
        {toggleCreateWorkout ? "Hide Create Workout" : "Create Workout"}
      </MDBBtn>

      {toggleCreateWorkout && (
        <div className="createWorkout">
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
      )}
    </div>
  );
};

export default Workout;
