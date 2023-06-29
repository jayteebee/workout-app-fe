import React, { useState, useEffect } from 'react'
import { getWorkoutsInRoutine } from '../../API/Routine/Routine'

const FetchWorkoutsInRoutine = ({rID}) => {
    const [workoutsInRoutine, setWorkoutsInRoutine] = useState([])

    useEffect(() => {
        if(rID) {
        getWorkoutsInRoutine(rID)
        .then((data) => {
            setWorkoutsInRoutine(data)
            console.log(data)
        })
        .catch((err) => console.log("getWorkoutsInRoutine API Call Failed",err))
    }}, [rID])
  return (
    <div>
    {workoutsInRoutine.map((workouts) => (
        <div key={workouts.id}> 
        <p>{workouts.workout.name}</p>
        </div>
    ))}
    </div>
  )
}

export default FetchWorkoutsInRoutine