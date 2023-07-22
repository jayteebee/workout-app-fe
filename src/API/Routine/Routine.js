import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL ROUTINES - WORKING!
export const getAllRoutines = async () => {
    const r = await axiosInstanceWithToken.get(`/routines`);
    return r.data;
}

// console.log(getAllRoutines()); 

// GET ROUTINE BY ID - WORKING!
export const getRoutineById = async (routineID) => {
    const r = await axiosInstanceWithToken.get(`/routines/${routineID}`);
    return r.data;
}

// console.log(getRoutineById(3))

// GET WORKOUTS IN ROUTINE - WORKING!
export const getWorkoutsInRoutine = async (routineID) => {
    const r = await axiosInstanceWithToken.get(`/routines/${routineID}/workouts`);
    return r.data;
}

// console.log(getWorkoutsInRoutine(4));


// POST REQUESTS

// CREATE ROUTINE - WORKING!
export const createRoutine = async (routineData) => {
    const r = await axiosInstanceWithToken.post(`/routines`, {routine: routineData});
    return r.data;
}

// console.log(createRoutine())


// PUT REQUESTS

// ADD WORKOUT TO ROUTINE - WORKING!
export const addWorkoutToRoutine = async (routineID, workoutData) => {
    console.log("Workout Data: ",workoutData)
    const r = await axiosInstanceWithToken.put(`/routines/${routineID}/workouts`, workoutData);
    return r.data;
}

// = {workout_id: 1, order: 0}

// console.log(addWorkoutToRoutine(12));

// EDIT ROUTINE BY ID - WORKING!
export const editRoutineByID = async (routineID, routineData) => {
    const r = await axiosInstanceWithToken.put(`/routines/${routineID}`, routineData);
    return r.data;
}

// console.log(editRoutineByID(4));


// DELETE REQUESTS

// DELETE WORKOUT FROM ROUTINE - WORKING!
export const deleteWorkoutFromRoutine = async (routineID, workoutID) => {
    const r = await axiosInstanceWithToken.delete(`/routines/${routineID}/workouts/${workoutID}`)
    return r.data;
}

// console.log(deleteWorkoutFromRoutine(4,1));

// DELETE ROUTINE BY ID - WORKING!
export const deleteRoutineByID = async (routineID) => {
    const r = await axiosInstanceWithToken.delete(`/routines/${routineID}`);
    return r.data;
}

// console.log(deleteRoutineByID(4));