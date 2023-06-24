import React, {useState} from 'react'
import LogIn from '../Components/RegisterOrLogIn/LogIn'
import Register from '../Components/RegisterOrLogIn/Register'

const RegisterOrLogIn = () => {
const [showRegister, setShowRegister] = useState(false)

  return (
    <div>

{showRegister ? <Register /> :  <LogIn setShowRegister={setShowRegister}/>}
   
    </div>
  )
}

export default RegisterOrLogIn