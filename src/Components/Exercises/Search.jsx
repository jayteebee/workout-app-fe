import React, { useState } from 'react'
import { MDBInputGroup, MDBInput, MDBBtn } from 'mdb-react-ui-kit';


const Search = () => {

const [formInput, setFormInput] = useState({exercise: ""})
console.log("FormInput - Search",formInput)

const handleChange = (e) => {
    setFormInput({
        ...formInput,
        [e.target.name]: e.target.value,
      });
}

  return (
    <div>
    <h3>Search</h3>

    <MDBInputGroup>
    <MDBInput 
    label='Search'
    value={formInput.exercise}
    name="exercise"
    onChange={handleChange}
    />
    <MDBBtn rippleColor='dark'> Search </MDBBtn>
  </MDBInputGroup>
    
    
    </div>
  )
}

export default Search