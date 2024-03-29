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
import "intro.js/introjs.css";
import { IntroJsContext } from "./Context/IntroJsContext";

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
  const [managingRoutineAndWorkoutData, setManagingRoutineAndWorkoutData] =
    useState({
      selectedRoutineID: "",
      routineFrequencyExists: "",
    });

  const [steps, setSteps] = useState([
    {
      element: "#react-burger-menu-btn",
      intro:
        "Click here to open the Navigation Bar to view Routines, Logs, and Analytics!",
      position: "right",
      disableInteraction: false,
    },
    {
      element: "#routinesMenuOption",
      intro:
        "Click Routines to create Routines, Workouts, and Exercises.",
      position: "left",
    },
    {
      element: "#routineOptions",
      intro:
        "Decide which format you'll schedule your Routine. Flexible or Fixed?",
      position: "bottom",
    },
    {
      element: "#createRoutineTutorial",
      intro: "Fill out the Create Routine form, then click 'Create Routine'.",
      position: "bottom",
    },
    {
      element: "#viewExistingRoutinesTutorialButton",
      intro: "View Your Routines!",
      position: "bottom",
    },
    {
      element: "#routineButtonsTutorial",
      intro:
        "Tap here to view and create your workouts!",
      position: "bottom",
    },
    {
      element: "#createWorkoutFormForTutorial",
      intro:
        "Configure your workout, then click 'Create Workout'. Do this as many times as needed!",
      position: "bottom",
    },
    {
      element: "#scheduleWorkoutsForTutorial",
      intro:
        "When you've created all your workouts, click here to add the schedule to your calendar on the home screen.",
      position: "bottom",
    },
    {
      element: "#viewExistingWorkoutsForTutorial",
      intro:
        "View the workouts you've just created and add exercises to them.",
      position: "bottom",
    },
    {
      element: "#viewAndCreateExercisesForTutorial",
      intro:
        "View or add exercises in each workout. Click Add Exercises now to continue tutorial!",
      position: "right",
    },
    // below is 10
    {
      element: "#searchForTutorial",
      intro:
        "Filter exercises by using the buttons above, search for exercises in the search bar and then add the sets, reps, weight and rest!",
      position: "bottom",
    },
    // below is 11
    {
      element: "#addExerciseButton",
      intro:
        "When you've made your exercise, click here to add it to the workout. When you've added all your exercises, head back to the homepage via the nav bar.",
      position: "left",
    },
    {
      element: "#react-burger-menu-btn",
      intro:
        "Navigate to the Home Screen",
      position: "left",
    },
    {
  element: "#calendarForIntro",
      intro:
        "On the day of your workout, click 'Start *Workout Name*' to track your in gym performance.",
      position: "top",
    },
    {
      element: "#exerciseSessionContainerForTutorial",
          intro:
            "This is where you will track each set of your workout. Tapping the green button will start the set, tapping the red button will end the set, and whilst the button is purple, you should be resting.",
          position: "left",
        },
  ]);

  let nextButton = document.querySelector('.introjs-nextbutton');
  let prevButton = document.querySelector('.introjs-prevbutton');

  
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
// console.log('initialStep',initialStep)
const onExit = () => {
  setStepsEnabled(false);
  let helperLayer = document.querySelector('.introjs-helperLayer');
  if (helperLayer) {
    helperLayer.remove();
    }
  };
  
  if (nextButton) {
    if (initialStep && initialStep === 0) {
      nextButton.classList.remove('hide-button')
      nextButton.classList.add('show-button');
    } else {
      nextButton.classList.add('hide-button');
    }
    if (initialStep === 4) {
      nextButton.classList.add('show-button');
    }
    if (initialStep === 7) {
      nextButton.classList.add('show-button');
    }
    if (initialStep === 8) {
      nextButton.classList.add('show-button');
    }
    if (initialStep === 10) {
      prevButton.classList.remove('show-button')
      prevButton.classList.add('hide-button');
    }
    if (initialStep === 12) {
      nextButton.classList.add('show-button');
    }
    if (initialStep === 14) {
      prevButton.classList.add('hide-button');
    }
  }

  const tutorialShown = localStorage.getItem('tutorialShown');
  const tutorialComplete = localStorage.getItem('tutorialComplete');
  const restartingTutorial = localStorage.getItem('restartingTutorial');

  useEffect(() => {
    if (restartingTutorial) {
      console.log('restarting tut',)
      setStepsEnabled(true)
      localStorage.removeItem("restartingTutorial")
    }

    if (!tutorialShown) {
      setStepsEnabled(true);
      localStorage.setItem('tutorialShown', 'true');
    }
if (tutorialComplete) {
  setStepsEnabled(false)
}
    }, [tutorialComplete, tutorialShown, restartingTutorial, stepsEnabled])


useEffect(() => {
  const shouldRestartTutorial = localStorage.getItem('restartingTutorial');
  if (shouldRestartTutorial) {
    // Start the tutorial
    setStepsEnabled(true);
    // Reset the flag
    localStorage.removeItem('restartingTutorial');
  }
}, []);

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
      <div className="App-inner">
        {loggedIn ? (
          <div >
            <IntroJsContext.Provider
              value={{
                steps,
                stepsEnabled,
                initialStep,
                onExit,
                setInitialStep,
                setStepsEnabled,
              }}
            >
              <NavBar id="navbarID" />
            </IntroJsContext.Provider>
          </div>
        ) : null}

        {loggedIn && <BackButton />}

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <IntroJsContext.Provider
              value={{
                steps,
                stepsEnabled,
                initialStep,
                onExit,
                setInitialStep,
                setStepsEnabled,
              }}
            >
                <WorkoutContext.Provider
                  value={{ exercisesInWorkout, setExercisesInWorkout }}
                >
                  <HomeScreen routineID={routineID} loggedIn={loggedIn} />
                </WorkoutContext.Provider>
                </IntroJsContext.Provider>
              }
            />

            <Route
              path="/Routines"
              element={
                <IntroJsContext.Provider
                value={{
                  steps,
                  stepsEnabled,
                  initialStep,
                  onExit,
                  setInitialStep,
                  setStepsEnabled,
                }}
              >
                <RoutineAndWorkoutDataContext.Provider
                  value={{
                    setManagingRoutineAndWorkoutData,
                    managingRoutineAndWorkoutData,
                  }}
                >
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
                </RoutineAndWorkoutDataContext.Provider>
                </IntroJsContext.Provider>
              }
            />

            <Route
              path="/Workout"
              element={

                <IntroJsContext.Provider
                value={{
                  steps,
                  stepsEnabled,
                  initialStep,
                  onExit,
                  setInitialStep,
                  setStepsEnabled,
                }}
              >

                <RoutineAndWorkoutDataContext.Provider
                  value={{
                    setManagingRoutineAndWorkoutData,
                    managingRoutineAndWorkoutData,
                  }}
                >
                  <Workout
                    weekly={weekly}
                    routineFrequency={routineFrequency}
                    activeRoutine={activeRoutine}
                    routineChange={routineChange}
                  />
                </RoutineAndWorkoutDataContext.Provider>
                </IntroJsContext.Provider>

              }
            />
            <Route path="/CreateExercise" element={
              <IntroJsContext.Provider
              value={{
                steps,
                stepsEnabled,
                initialStep,
                onExit,
                setInitialStep,
                setStepsEnabled,
              }}
            >
              <ExerciseCreation />
              </IntroJsContext.Provider>
            
            } />

            <Route path="/Knowledge" element={<Knowledge />} />

            <Route path="/Analytics" element={<Analytics />} />

            <Route path="/Logs" element={<Logs />} />

            <Route path="/ViewExercises" element={<ViewExercises />} />

            <Route path="/Profile" element={<Profile loggedIn={loggedIn} />} />

            <Route
              path="/Session"
              element={
                <IntroJsContext.Provider
                value={{
                  steps,
                  stepsEnabled,
                  initialStep,
                  onExit,
                  setInitialStep,
                  setStepsEnabled,
                }}
              >
                <WorkoutContext.Provider
                  value={{ exercisesInWorkout, setExercisesInWorkout }}
                >
                  <WorkoutSession />
                </WorkoutContext.Provider>
                </IntroJsContext.Provider>

              }
            />
          </Route>

          <Route
            path="/GettingStarted"
            element={<RegisterOrLogIn setLoggedIn={setLoggedIn} />}
          />

          <Route
            path="/GettingStarted/confirmation"
            element={<ConfirmAccount />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
