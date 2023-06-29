import React from 'react'
import "../../CSS/NavBar.css"
import { Link } from 'react-router-dom'

const NavBarMenu = ({setShowMenu}) => {
  return (
    <div className='hamburgerMenu'>
<Link to="/CreateRoutine" onClick={() => setShowMenu((prevState) => !prevState)}>
    <h2>Create Routine</h2>
</Link>
    <h2>Create Workout</h2>
    <h2>Knowledge</h2>
    <h2>Personal Bests</h2>
    </div>
  )
}

export default NavBarMenu