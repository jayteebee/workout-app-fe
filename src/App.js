import logo from './logo.svg';
import './App.css';
import { createUser } from './API/Authentication/Authentication';
import { getAllUsers } from './API/User/User';
import { getAllRoutines } from './API/Routine/Routine';
import { getAllWorkouts } from './API/Workout/Workout';
import { getAllExercises } from './API/Exercise/Exercise';
import { getAllWorkoutDays } from './API/WorkoutDays/WorkoutDays';
import {getAllWorkoutSchedules} from './API/WorkoutSchedule/WorkoutSchedule'
import { getAllWorkoutSessions } from './API/WorkoutSession/WorkoutSession';
import { getAllExerciseSessions } from './API/ExerciseSession/ExerciseSession';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

    </div>
  );
}

export default App;
