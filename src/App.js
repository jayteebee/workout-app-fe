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

  // const externalNavToggle = () => {
  //   if (showMenu) {
  //     setShowMenu(false);
  //   }
  // };
  // console.log("showMenu", showMenu)

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
          <NavBar
            // className="navbar"
            // setShowMenu={setShowMenu}
            // showMenu={showMenu}
          />
        ) : null}

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={<HomeScreen routineID={routineID} loggedIn={loggedIn} />}
            />

            <Route
              path="/Routines"
              element={
                <Routines
                  setCustom={setCustom}
                  custom={custom}
                  setWeekly={setWeekly}
                  weekly={weekly}
                  setRoutineFrequency={setRoutineFrequency}
                  setActiveRoutine={setActiveRoutine}
                  activeRoutine={activeRoutine}
                  setRoutineChange={setRoutineChange}
                />
              }
            />

            <Route
              path="/Workout"
              element={
                <Workout
                  weekly={weekly}
                  custom={custom}
                  routineFrequency={routineFrequency}
                  activeRoutine={activeRoutine}
                  routineChange={routineChange}
                />
              }
            />

            <Route path="/CreateExercise" element={<ExerciseCreation />} />

            <Route path="/Knowledge" element={<Knowledge />} />

            <Route path="/Analytics" element={<Analytics />} />

            <Route path="/Logs" element={<Logs />} />

            <Route path="/ViewExercises" element={<ViewExercises />} />

            <Route path="/Profile" element={<Profile loggedIn={loggedIn} />} />

            <Route path="/Session" element={<WorkoutSession />} />
          </Route>

          <Route
            path="/GettingStarted"
            element={<RegisterOrLogIn setLoggedIn={setLoggedIn} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
