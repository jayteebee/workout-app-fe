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
import Analytics from "./Pages/Analytics";
import Logs from "./Pages/Logs";
import { useEffect, useState } from "react";
import ExerciseCreation from "./Pages/ExerciseCreation";
import ViewExercises from "./Pages/ViewExercises";
import Profile from "./Pages/Profile";
import WorkoutSession from "./Pages/WorkoutSession";
import { getAllRoutines } from "./API/Routine/Routine";
import { parseJwt } from "./API/Authentication/parseJwt";
import { WorkoutContext } from "./Context/WorkoutContext";
import { RoutineAndWorkoutDataContext } from "./Context/RoutineAndWorkoutDataContext";
import ConfirmAccount from "./Components/RegisterOrLogIn/ConfirmAccount";
import BackButton from "./Components/Navigation/BackButton";
import 'intro.js/introjs.css';



// brew services start redis - backend service
// foreman start -p 4000

function App() {
  // used for toggling certain useEffects and the navBar
  const [loggedIn, setLoggedIn] = useState(false);
  // for navbar
  // const [showMenu, setShowMenu] = useState(false);
  // conditionally renders certain fields in create routine
  const [custom, setCustom] = useState(false);
  const [weekly, setWeekly] = useState(false);
  const [routineFrequency, setRoutineFrequency] = useState([]);
  const [routineID, setRoutineID] = useState(0);
  const [allRoutines, setAllRoutines] = useState([]);
  const [userID, setUserID] = useState(0);
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  // for the active routine feature
  const [activeRoutine, setActiveRoutine] = useState();
  const [routineChange, setRoutineChange] = useState(false);
  // console.log('activeRoutine', activeRoutine, "routineChange", routineChange)

  const [exercisesInWorkout, setExercisesInWorkout] = useState([]);
  const [managingRoutineAndWorkoutData, setManagingRoutineAndWorkoutData] = useState({
    selectedRoutineID: "",
    routineFrequencyExists: ""
  })

const [steps, setSteps] = useState([
  {
    element: '#react-burger-menu-btn',
    intro: 'Click here to open the Navigation Bar and view Routines, Logs, and Analytics!',
    position: 'right',
    disableInteraction: false
  },
  {
    element: '#routinesMenuOption',
    intro: "Now you're in the menu! Click Routines to create Routines, Workouts, and Exercises.",
    position: 'left'
  },
  {
    element: '#routineOptions',
    intro: "Decide which format you'll schedule your Routine. Flexible or Fixed?",
    position: 'bottom'
  }
])

const [stepsEnabled, setStepsEnabled] = useState(true);
const [initialStep, setInitialStep] = useState(0)

const onExit = () => {
  setStepsEnabled(false);
};

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const token = window.localStorage.getItem("token");
      const decodedToken = parseJwt(token);
      const userID = decodedToken.sub;
      setUserID(userID);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      getAllRoutines()
        .then((data) => {
          setAllRoutines(data);
        })
        .catch((err) => {
          console.log("getAllRoutines API Call Failed", err);
        });
    }
  }, []);

  useEffect(() => {
    const routinesFilteredForID = allRoutines.filter(
      (r) => r.user_id == userID
    );
    setFilteredRoutines(routinesFilteredForID);
  }, [allRoutines]);

  useEffect(() => {
    const routineID = filteredRoutines && filteredRoutines.map((f) => f.id);
    routineID && setRoutineID(routineID[0]);
  }, [filteredRoutines]);


  return (
    <div className="App">
  {/**onClick={externalNavToggle} */}
      <div className="App-inner" >
        {loggedIn ? (
          <div>
          <NavBar
            id="navbarID"
            steps={steps}
            stepsEnabled={stepsEnabled}
            initialStep={initialStep}
            onExit={onExit}
            setInitialStep={setInitialStep}
            setStepsEnabled={setStepsEnabled}
            // setShowMenu={setShowMenu}
            // showMenu={showMenu}
          />
          </div>
          ) : null}
          
          {loggedIn && 
            <BackButton/>
          }
        
          <Routes>
        <Route element={<PrivateRoute />}>
        <Route
        path="/"
        element={
          <WorkoutContext.Provider value={{exercisesInWorkout, setExercisesInWorkout}}>
          <HomeScreen routineID={routineID} loggedIn={loggedIn} />          
          </WorkoutContext.Provider>
              
              }
            />

            <Route
            path="/Routines"
            element={
              
              <RoutineAndWorkoutDataContext.Provider value={{setManagingRoutineAndWorkoutData , managingRoutineAndWorkoutData}}>
                <Routines
                  setCustom={setCustom}
                  custom={custom}
                  setWeekly={setWeekly}
                  weekly={weekly}
                  setRoutineFrequency={setRoutineFrequency}
                  setActiveRoutine={setActiveRoutine}
                  activeRoutine={activeRoutine}
                  setRoutineChange={setRoutineChange}
                  steps={steps}
                  stepsEnabled={stepsEnabled}
                  initialStep={initialStep}
                  onExit={onExit}
                  setInitialStep={setInitialStep}
                  setStepsEnabled={setStepsEnabled}
                />
              </RoutineAndWorkoutDataContext.Provider>

              }
            />

            <Route
              path="/Workout"
              element={
            <RoutineAndWorkoutDataContext.Provider value={{setManagingRoutineAndWorkoutData , managingRoutineAndWorkoutData}}>
                <Workout
                  weekly={weekly}
                  custom={custom}
                  routineFrequency={routineFrequency}
                  activeRoutine={activeRoutine}
                  routineChange={routineChange}
                />
                </RoutineAndWorkoutDataContext.Provider>
              }
            />
            <Route path="/CreateExercise" element={<ExerciseCreation />} />

            <Route path="/Knowledge" element={<Knowledge />} />

            <Route path="/Analytics" element={<Analytics />} />

            <Route path="/Logs" element={<Logs />} />

            <Route path="/ViewExercises" element={<ViewExercises />} />

            <Route path="/Profile" element={<Profile loggedIn={loggedIn} />} />

            <Route path="/Session" element={
              
              <WorkoutContext.Provider value={{exercisesInWorkout, setExercisesInWorkout}}>
              <WorkoutSession />
              </WorkoutContext.Provider>
            } />

            </Route>

          <Route
            path="/GettingStarted"
            element={<RegisterOrLogIn setLoggedIn={setLoggedIn} />}
          />

          <Route path="/GettingStarted/confirmation" element={<ConfirmAccount />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
