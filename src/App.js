import "./App.css";
import RegisterOrLogIn from "./Pages/RegisterOrLogIn";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Routes, Route } from "react-router-dom";
import { createUser } from "./API/Authentication/Authentication";
import PrivateRoute from "./Utilities/PrivateRoute"
import HomeScreen from "./Pages/HomeScreen";

function App() {
  return (
    <div className="App">
      <div className="App-inner">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomeScreen />} />
        </Route>

         <Route path="/GettingStarted" element={<RegisterOrLogIn />} />
      </Routes>  
      </div>
    </div>
  );
}

export default App;
