import logo from './logo.svg';
import './App.css';
import { createUser } from './API/Authentication/Authentication';
import { getAllUsers } from './API/User/User';

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
