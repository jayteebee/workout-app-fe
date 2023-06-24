import React from 'react'
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
  } from 'mdb-react-ui-kit';
  
const Register = ({setShowRegister}) => {

    const showRegister = (e) => {
        e.preventDefault()
        setShowRegister(false)
    }

  return (
    <div>
    <form>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='form3Example1' label='First name' />
        </MDBCol>
        <MDBCol>
          <MDBInput id='form3Example2' label='Last name' />
        </MDBCol>
      </MDBRow>
      <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' />
      <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' />


      <MDBBtn type='submit' className='mb-4' block onClick={showRegister}>
        Sign Up!
      </MDBBtn>

      <div className='text-center'>
        
      </div>
    </form>
    </div>
  )
}

export default Register