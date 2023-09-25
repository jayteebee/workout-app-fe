import React, { useEffect } from 'react'
import { deleteRoutineByID } from '../../API/Routine/Routine'

const DeleteRoutine = ({routineToDelete, setRoutineToDelete, setDeleteToggle}) => {

    useEffect(() => {
        deleteRoutineByID(routineToDelete)
        .then(() => {setRoutineToDelete(null)
          setDeleteToggle((prevState) => !prevState)
        })
        .catch((err) => console.error(err))
        localStorage.removeItem('hiddenState')
    }, [routineToDelete, setRoutineToDelete])


  return (
    <div>
    

    </div>
  )
}

export default DeleteRoutine