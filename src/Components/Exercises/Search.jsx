import React, { useState, useEffect } from 'react'
import { MDBInputGroup, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { getAllExercises } from '../../API/Exercise/Exercise'

const Search = () => {

const [formInput, setFormInput] = useState({exercise: ""})
console.log("FormInput - Search",formInput)

const [allExercises, setAllExercises] = useState([])

useEffect(() => {
  getAllExercises()
  .then((data) => {
      setAllExercises(data);
  })
  .catch((err) => {console.log("getAllExercises API Call Failed: ",err)})
}, [])
console.log(allExercises)


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
    
  <MDBDropdown>
  <MDBDropdownToggle>Dropdown button</MDBDropdownToggle>
  <MDBDropdownMenu>
{allExercises.map((exercise, index) => (
  <div key={index}>
    <MDBDropdownItem link>{exercise.name}</MDBDropdownItem>
  </div>
))}

    

  </MDBDropdownMenu>
</MDBDropdown>

    </div>
  )
}

export default Search