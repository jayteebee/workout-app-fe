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

// console.log(getWorkoutsInRoutine(3));


// POST REQUESTS

// CREATE ROUTINE - WORKING!
export const createRoutine = async (routineData = {user_id:5, name: "HIT", frequency: 3}) => {
    const r = await axiosInstanceWithToken.post(`/routines`, routineData);
    return r.data;
}

// console.log(createRoutine())