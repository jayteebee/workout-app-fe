import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL WORKOUTS - Working!
export const getAllWorkouts = async () => {
    const r = await axiosInstanceWithToken.get(`/workouts`);
    return r.data
}

// console.log(getAllWorkouts());


// GET WORKOUT BY ID - Working!
 export const getWorkoutById = async (workoutID) => {
    const r = await axiosInstanceWithToken.get(`/workouts/${workoutID}`);
    return r.data;
}

// console.log(getWorkoutById(1))