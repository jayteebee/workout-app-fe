import React, { useEffect } from 'react'
import { deleteRoutineByID } from '../../API/Routine/Routine'

const DeleteRoutine = ({routineToDelete, setRoutineToDelete, setDeleteToggle}) => {

    useEffect(() => {
        deleteRoutineByID(routineToDelete)
        .then(() => {setRoutineToDelete(null)
        })
        .catch((err) => console.error(err))
        setDeleteToggle((prevState) => !prevState)
        localStorage.removeItem('hiddenState')
    }, [routineToDelete, setRoutineToDelete])


  return (
    <div>
    

    </div>
  )
}

export default DeleteRoutine