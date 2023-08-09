import React from 'react'
import { useState } from 'react'
import HamburgerMenu from '../../StyleResources/HamburgerMenu.png'
import NavBarMenu from './NavBarMenu'
import "../../CSS/NavBar.css"

const NavBar = () => {
const [showMenu, setShowMenu] = useState(false)

const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
}

  return (
    <div className='navigationBar'>
    <img src={HamburgerMenu} alt="Menu" onClick={toggleMenu} className="colored-hamburger" /> 
    {showMenu ? <NavBarMenu setShowMenu={setShowMenu}/> : null}
    </div>
  )
}

export default NavBar