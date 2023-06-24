import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL WORKOUT DAYS - Working!
export const getAllWorkoutDays = async () => {
    const r = await axiosInstanceWithToken.get(`/workout_days`);
    return r.data
}

// console.log(getAllWorkoutDays());