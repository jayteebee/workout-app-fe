import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL WORKOUT DAYS - Working!
export const getAllWorkoutDays = async () => {
    const r = await axiosInstanceWithToken.get(`/workout_days`);
    return r.data
}

// console.log(getAllWorkoutDays());

// GET WORKOUT DAY BY ID - Working!
// Still need to figure out exactly how to implement this
export const getWorkoutDayById = async (workoutDayID) => {
    const r = await axiosInstanceWithToken.get(`/workout_days/${workoutDayID}`);
    return r.data;
}

console.log(getWorkoutDayById(2))