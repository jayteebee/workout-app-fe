import React from 'react'
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
  } from 'mdb-react-ui-kit';

const LogIn = ({setShowRegister}) => {
    
const showRegister = (e) => {
    e.preventDefault()
    setShowRegister(true)
}
  return (
    <div>
    <form>
      <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address' />
      <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' />

      <MDBRow className='mb-4'>
        <MDBCol className='d-flex justify-content-center'>
          <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href='#!'>Forgot password?</a>
        </MDBCol>
      </MDBRow>

      <MDBBtn type='submit' className='mb-4' block>
        Sign in
      </MDBBtn>

      <div className='text-center'>
        <p>
          Not a member? <a href="#!" onClick={showRegister}>Register</a>
        </p>
      </div>
    </form>
    </div>
  )
}

export default LogIn