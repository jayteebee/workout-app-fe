import "./App.css";
import RegisterOrLogIn from "./Pages/RegisterOrLogIn";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Utilities/PrivateRoute";
import HomeScreen from "./Pages/HomeScreen";
import NavBar from "./Components/Navigation/NavBar";
import CreateRoutine from "./Pages/CreateRoutine";
import CreateWorkout from "./Pages/CreateWorkout";
import Knowledge from "./Pages/Knowledge";
import PersonalBests from "./Pages/PersonalBests";
import Logs from "./Pages/Logs";

// brew services start redis - backend service

function App() {
  return (
    <div className="App">
      <div className="App-inner">
        <NavBar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomeScreen />} />

            <Route path="/CreateRoutine" element={<CreateRoutine />} />

            <Route path="/CreateWorkout" element={<CreateWorkout />} />

            <Route path="/Knowledge" element={<Knowledge />} />

            <Route path="/PersonalBests" element={<PersonalBests />} />

            <Route path="/Logs" element={<Logs />} />
          </Route>

          <Route path="/GettingStarted" element={<RegisterOrLogIn />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
