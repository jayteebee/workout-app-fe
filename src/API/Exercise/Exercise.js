import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL EXERCISES - Working!
export const getAllExercises = async () => {
    const r = await axiosInstanceWithToken.get(`/exercises`);
    return r.data
}

// console.log(getAllExercises());