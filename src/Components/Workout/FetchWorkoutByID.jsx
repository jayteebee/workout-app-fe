import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getWorkoutsInRoutine } from '../../API/Routine/Routine'

const FetchWorkoutByID = () => {
const [workout, setWorkout] = useState([])
const location = useLocation();
const selectedRoutineID = location.state?.selectedRoutineID;
console.log(selectedRoutineID)

useEffect(() => {
    getWorkoutsInRoutine()
    .then((data) => {
        setWorkout(data)
    })
    .catch((err) => {console.log("getWorkoutsInRoutine API Call Failed",err)})
}, [selectedRoutineID])
  return (
    <div>
    <p> now {selectedRoutineID} </p> 
    
    </div>
  )
}

export default FetchWorkoutByID




// from the FetchAllRoutines page, we need to send the ID of the selected
// routine to here
// we then need to display all the workouts belonging to that routine
// on the new workouts page