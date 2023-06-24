import React, {useState} from 'react'
import LogIn from '../Components/RegisterOrLogIn/LogIn'
import Register from '../Components/RegisterOrLogIn/Register'


const RegisterOrLogIn = () => {
const [showRegister, setShowRegister] = useState(false)

  return (
    <div>
<div style={{height: '100vh'}} className='d-flex justify-content-center align-items-center'>
{showRegister ? <Register setShowRegister={setShowRegister} /> :  <LogIn setShowRegister={setShowRegister} />}
 </div>  
    </div>
  )
}

export default RegisterOrLogIn