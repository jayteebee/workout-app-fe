import React, { useState, useEffect } from 'react'
import { getAllExercises } from '../../API/Exercise/Exercise'
import ReactSelect from 'react-select';

const Search = () => {

const [formInput, setFormInput] = useState(null)
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

const exercises = allExercises.map((exercise) => ({
  label: exercise.name
}))

const handleChange = (formInput) => {
    setFormInput(formInput);
}

  return (
    <div>
    <h3>Search</h3>

<ReactSelect 
placeholder="Search By Exercise Name"
options={exercises}
  value={formInput}
  onChange={handleChange}
/>

    </div>
  )
}

export default Search


// <MDBInputGroup>
// <MDBInput 
// label='Search Exercises By Name...'
// value={formInput.exercise}
// name="exercise"
// onChange={handleChange}
// />

// <MDBDropdown>
// <MDBDropdownToggle>Dropdown button</MDBDropdownToggle>
// <MDBDropdownMenu>
// {allExercises.map((exercise, index) => (
// <div key={index}>
// <MDBDropdownItem link>{exercise.name}</MDBDropdownItem>
// </div>
// ))}

// </MDBDropdownMenu>
// </MDBDropdown>
// </MDBInputGroup>


// const handleChange = (e) => {
//   setFormInput({
//       ...formInput,
//       [e.target.name]: e.target.value,
//     });
// }