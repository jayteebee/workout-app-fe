import React from 'react'
import "../../CSS/NavBar.css"
import { Link } from 'react-router-dom'

const NavBarMenu = ({setShowMenu}) => {
  return (
    <div className='hamburgerMenu'>

<Link to="/CreateRoutine" onClick={() => setShowMenu((prevState) => !prevState)}>
    <h2>Create Routine</h2>
</Link>
<Link to="/CreateWorkout" onClick={() => setShowMenu((prevState) => !prevState)}>

    <h2>Create Workout</h2>
</Link>
<Link to="/Knowledge" onClick={() => setShowMenu((prevState) => !prevState)}>

    <h2>Knowledge</h2>
</Link>
<Link to="/PersonalBests" onClick={() => setShowMenu((prevState) => !prevState)}>

    <h2>Personal Bests</h2>
   </Link>
   <Link to="/Logs" onClick={() => setShowMenu((prevState) => !prevState)}>
 
    <h2>Logs</h2>
  </Link>  
    </div>
  )
}

export default NavBarMenu