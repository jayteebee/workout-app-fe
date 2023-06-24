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
export const createRoutine = async (routineData = {user_id:5, name: "HIT", frequency: 3}) => {
    const r = await axiosInstanceWithToken.post(`/routines`, routineData);
    return r.data;
}

// console.log(createRoutine())


// PUT REQUESTS

// ADD WORKOUT TO ROUTINE - WORKING!
export const addWorkoutToRoutine = async (routineID, workoutData = {workout_id: 3, order: 2}) => {
    const r = await axiosInstanceWithToken.put(`/routines/${routineID}/workouts`, workoutData);
    return r.data;
}

// console.log(addWorkoutToRoutine(4));

// EDIT ROUTINE BY ID - WORKING!
export const editRoutineByID = async (routineID, routineData = {frequency: 3}) => {
    const r = await axiosInstanceWithToken.put(`/routines/${routineID}`, routineData);
    return r.data;
}

// console.log(editRoutineByID(4));