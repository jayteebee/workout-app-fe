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


// POST REQUESTS

// CREATE EXERCISE - Working! (probably won't use this)
export const createExercise = async (exerciseData = {name: "Vertical Leg Press"}) => {
    const r = await axiosInstanceWithToken.post(`/exercises`, exerciseData);
    return r.data;
};

// console.log(createExercise());


// PUT REQUESTS

// EDIT EXERCISE BY ID - Working!
export const editExerciseByID = async (exerciseID, exerciseData = {name: "90 Degree Leg Press"}) => {
    const r = await axiosInstanceWithToken.put(`/exercises/${exerciseID}`, exerciseData);
    return r.data;
};

// console.log(editExerciseByID(130));


// DELETE REQUESTS

// DELETE EXERCISE BY ID - working!
export const deleteExerciseByID = async (exerciseID) => {
    const r = await axiosInstanceWithToken.delete(`/exercises/${exerciseID}`);
    return r.data;
}

// console.log(deleteExerciseByID(130));