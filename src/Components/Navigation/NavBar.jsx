import React from 'react'
import { useState } from 'react'
import HamburgerMenu from '../../StyleResources/HamburgerMenu.png'
import NavBarMenu from './NavBarMenu'

const NavBar = () => {
const [showMenu, setShowMenu] = useState(false)

const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
}

  return (
    <div >
    <img src={HamburgerMenu} alt="Menu" onClick={toggleMenu} /> 
    {showMenu ? <NavBarMenu setShowMenu={setShowMenu}/> : null}
    </div>
  )
}

export default NavBar