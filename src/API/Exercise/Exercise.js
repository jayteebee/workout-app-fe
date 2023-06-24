import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL EXERCISES - Working!
export const getAllExercises = async () => {
    const r = await axiosInstanceWithToken.get(`/exercises`);
    return r.data
}

// console.log(getAllExercises());


// GET EXERCISE BY ID - Working!
export const getExerciseById = async (exerciseID) => {
    const r = await axiosInstanceWithToken.get(`/exercises/${exerciseID}`);
    return r.data;
}

// console.log(getExerciseById(1))