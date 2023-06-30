import React, {useState, useEffect} from 'react'
import { parseJwt } from '../../API/Authentication/parseJwt';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { editRoutineByID } from '../../API/Routine/Routine';

const EditRoutine = ({eID, setEditToggle}) => {
    const [formInput, setFormInput] = useState({name:"", frequency:"", user_id: ""})
    console.log(formInput)

  useEffect(() => {
      const token = window.localStorage.getItem("token");
      const decodedToken = parseJwt(token);
      const userID = decodedToken.sub;
      setFormInput(prevState => ({...prevState, user_id: userID}));
  },[])
  
      const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            await editRoutineByID(eID,formInput);
          } catch (err) {
            console.error("Error:",err);
          } finally {
            setFormInput({});
            setEditToggle((prevState) => !prevState)
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
    <MDBInput className='mb-4' type='text' label='Edit Routine Name' value={formInput.name} name="name" onChange={handlechange} />
    <MDBInput className='mb-4' type='text' label='Edit Frequency' value={formInput.frequency} name="name" onChange={handlechange} />
    <MDBBtn type='submit' className='mb-4' block>
      Edit
    </MDBBtn>

  </form>
    
    </div>
  )
}

export default EditRoutine