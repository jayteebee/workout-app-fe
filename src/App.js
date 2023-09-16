import "./App.css";
import RegisterOrLogIn from "./Pages/RegisterOrLogIn";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Utilities/PrivateRoute";
import HomeScreen from "./Pages/HomeScreen";
import NavBar from "./Components/Navigation/NavBar";
import Routines from "./Pages/Routines";
import Workout from "./Pages/Workout";
import Knowledge from "./Pages/Knowledge";
import PersonalBests from "./Pages/PersonalBests";
import Logs from "./Pages/Logs";
import { useEffect, useState } from "react";
import ExerciseCreation from "./Pages/ExerciseCreation";
import ViewExercises from "./Pages/ViewExercises";
import Profile from "./Pages/Profile";
import WorkoutSession from "./Pages/WorkoutSession";

// brew services start redis - backend service
// bundle exec sidekiq
// WorkoutScheduleRegenerationJob.perform_async

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
const [showMenu, setShowMenu] = useState(false)
const [custom, setCustom] = useState(false)
const [weekly, setWeekly] = useState(false)
const [routineFrequency, setRoutineFrequency] = useState([])
console.log("routineFrequency", routineFrequency)



  useEffect(() => {
  const token = window.localStorage.getItem("token");
  token ? setLoggedIn(true) : setLoggedIn(false)
}, [])
  
const externalNavToggle = () => {
  if (showMenu) {
    setShowMenu(false)
  }
}
// console.log("showMenu", showMenu)

  return (
    <div className="App">
      <div className="App-inner" onClick={externalNavToggle}>
  
        { loggedIn ? <NavBar className="navbar"
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        /> : null }
        
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomeScreen  />} />

            <Route path="/Routines" element={<Routines
              setCustom={setCustom}
              custom={custom}
              setWeekly={setWeekly}
              weekly={weekly}
              setRoutineFrequency={setRoutineFrequency}
              />} />

            <Route path="/Workout" element={<Workout
              weekly={weekly}
              routineFrequency={routineFrequency}
              />} />

            <Route path="/CreateExercise" element={<ExerciseCreation />} />

            <Route path="/Knowledge" element={<Knowledge />} />

            <Route path="/PersonalBests" element={<PersonalBests />} />

            <Route path="/Logs" element={<Logs />} />

            <Route path="/ViewExercises" element={<ViewExercises />}/>

            <Route path="/Profile" element={<Profile />}/>

            <Route path="/Session" element={<WorkoutSession />}/>


          </Route>

          <Route path="/GettingStarted" element={<RegisterOrLogIn setLoggedIn={setLoggedIn} />} />
        </Routes>
        </div>
      </div>
    
  );
}

export default App;
