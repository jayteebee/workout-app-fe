import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL WORKOUT Schedules  - Working!
export const getAllWorkoutSchedules = async () => {
    const r = await axiosInstanceWithToken.get(`/workout_schedules`);
    return r.data
}

console.log(getAllWorkoutSchedules());