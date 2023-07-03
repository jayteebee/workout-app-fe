import React, { useEffect, useState } from 'react'
import { getAllExercises } from '../../API/Exercise/Exercise'

const FetchAllExercises = () => {
const [allExercises, setAllExercises] = useState([])

useEffect(() => {
    getAllExercises()
    .then((data) => {
        setAllExercises(data);
    })
    .catch((err) => {console.log("getAllExercises API Call Failed: ",err)})
}, [])

console.log(allExercises)

  return (
    <div>FetchAllExercises</div>
  )
}

export default FetchAllExercises