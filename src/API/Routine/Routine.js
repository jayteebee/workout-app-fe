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