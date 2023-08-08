import React, { useState } from "react";
import FetchAllExercises from "../Components/Exercises/FetchAllExercises";
import CreateWorkout from "../Components/Workout/CreateWorkout";
import FetchAllWorkouts from "../Components/Workout/FetchAllWorkouts";
import FetchExercisesInWorkout from "../Components/Workout/FetchExercisesInWorkout";
import FetchWorkoutByID from "../Components/Workout/FetchWorkoutByID";

const Workout = () => {
  const [workoutToggle, setWorkoutToggle] = useState(false);
  const [routineID, setRoutineID] = useState(Number);
  const [workoutCreated, setWorkoutCreated] = useState(false);


  return (
    <div>
      <h3>Workout</h3>

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

      <div className="createWorkout">
        <CreateWorkout
          setWorkoutToggle={setWorkoutToggle}
          workoutToggle={workoutToggle}
          routineID={routineID}
          setWorkoutCreated={setWorkoutCreated}
        />
      </div>

    


    </div>


  );
};

export default Workout;
