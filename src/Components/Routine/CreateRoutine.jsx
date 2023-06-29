import React, {useEffect, useState} from 'react'
import { parseJwt } from '../../API/Authentication/parseJwt';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { createRoutine } from '../../API/Routine/Routine';
const CreateRoutine = () => {
    const [formInput, setFormInput] = useState({userID: "",name:"", frequency:""})
  
useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setFormInput.userID(userID);
},[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await createRoutine(formInput);
        } catch (err) {
          console.error("Error:",err);
        } finally {
          setFormInput({});
        }
      }
        
      const handlechange = (e) => {
        setFormInput({
          ...formInput,
          [e.target.name]: e.target.value,
        })
      };

  return (
    <div>
    
    <form onSubmit={handleSubmit}>
    <MDBInput className='mb-4' type='text' label='Routine Name' value={formInput.name} name="name" onChange={handlechange} />
    <MDBInput className='mb-4' type='text' label='Frequency' value={formInput.frequency} name="frequency" onChange={handlechange} />

    <MDBBtn type='submit' className='mb-4' block>
      Create Routine
    </MDBBtn>

  </form>
    
    </div>
  )
}

export default CreateRoutine