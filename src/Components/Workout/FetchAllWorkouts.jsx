import React, { useState, useEffect } from 'react'
import { getAllWorkouts } from '../../API/Workout/Workout'

const FetchAllWorkouts = () => {
    const [allWorkouts, setAllWorkouts] = useState([])

    useEffect(() => {
        getAllWorkouts()
        .then((data) => {
            setAllWorkouts(data);
        })
        .catch((err) => {console.log("getAllRoutines API Call Failed",err)})
    },[] )
console.log(allWorkouts)
  return (
    <div>
    {allWorkouts.map((workout) => (
        <div key={workout.id}> 
        <button>{workout.name}</button>
        
        </div>
    ))}

    
    </div>
  )
}

export default FetchAllWorkouts