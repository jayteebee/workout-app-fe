import logo from './logo.svg';
import './App.css';
import RegisterOrLogIn from './Pages/RegisterOrLogIn';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { createUser } from './API/Authentication/Authentication';

function App() {


  return (
    <div className="App">
    <div className="App-inner">
  
    <RegisterOrLogIn />
    </div>
    </div>
  );
}

export default App;
