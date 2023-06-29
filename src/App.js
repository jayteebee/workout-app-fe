import "./App.css";
import RegisterOrLogIn from "./Pages/RegisterOrLogIn";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Utilities/PrivateRoute";
import HomeScreen from "./Pages/HomeScreen";
import NavBar from "./Components/Navigation/NavBar";
import Routines from "./Pages/Routines";
import CreateWorkout from "./Pages/CreateWorkout";
import Knowledge from "./Pages/Knowledge";
import PersonalBests from "./Pages/PersonalBests";
import Logs from "./Pages/Logs";
import { useEffect, useState } from "react";

// brew services start redis - backend service

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
  const token = window.localStorage.getItem("token");
  token ? setLoggedIn(true) : setLoggedIn(false)
}, [])
  

  return (
    <div className="App">
      <div className="App-inner">
        { loggedIn ? <NavBar /> : null }
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomeScreen />} />

            <Route path="/Routines" element={<Routines />} />

            <Route path="/CreateWorkout" element={<CreateWorkout />} />

            <Route path="/Knowledge" element={<Knowledge />} />

            <Route path="/PersonalBests" element={<PersonalBests />} />

            <Route path="/Logs" element={<Logs />} />
          </Route>

          <Route path="/GettingStarted" element={<RegisterOrLogIn setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
