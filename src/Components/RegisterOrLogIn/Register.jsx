import React from 'react'
import {
    MDBInput,
    MDBRow,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { createUser } from '../../API/Authentication/Authentication';
  
const Register = ({setShowRegister}) => {
const [formInput, setFormInput] = useState({email: "", password:""})

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await createUser(formInput);
  } catch (err) {
    console.error("Error Creating User: ",err);
  } finally {
    setFormInput({email: "", password: ""});
  }
  setShowRegister(false)
}

    const handlechange = (e) => {
      setFormInput({
        ...formInput,
        [e.target.name]: e.target.value,
      })
    };

    const showRegister = (e) => {
      e.preventDefault();
      setShowRegister(false)
    }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <MDBRow className='mb-4'>
      </MDBRow>
      <MDBInput className='mb-4' type='email' label='Email address' value={formInput.email} name="email" onChange={handlechange} />
      <MDBInput className='mb-4' type='password'  label='Password' value={formInput.password} name="password" onChange={handlechange} />


      <MDBBtn type='submit' className='mb-4' block >
        Sign Up!
      </MDBBtn>

      <div className='text-center'>
      <p>
      Already a member? <a href="#!" onClick={showRegister} >Log In</a>
    </p>
      </div>
    </form>
    </div>
  )
}

export default Register