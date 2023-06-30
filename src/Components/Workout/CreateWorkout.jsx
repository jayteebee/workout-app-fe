import React, { useState } from 'react'
import {
    MDBInput,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { createWorkout } from '../../API/Workout/Workout';


const CreateWorkout = () => {
    const [formInput, setFormInput] = useState({name:"", frequency:"", user_id: ""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await createWorkout(formInput);
        } catch (err) {
          console.error("Error:",err);
        } finally {
          setFormInput({});
          // setRoutineToggle((prevState) => !prevState);
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
    <MDBInput className='mb-4' type='text' label='Workout Name' value={formInput.name} name="name" onChange={handlechange} />

    <MDBBtn type='submit' className='mb-4' block>
      Create Routine
    </MDBBtn>

  </form>
    
    </div>
  )
}

export default CreateWorkout