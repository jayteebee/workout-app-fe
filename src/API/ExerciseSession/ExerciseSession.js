import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL EXERCISE SESSIONS - Working!
export const getAllExerciseSessions = async () => {
    const r = await axiosInstanceWithToken.get(`/exercise_session`);
    return r.data
}

// console.log(getAllExerciseSessions());

// GET EXERCISE SESSION BY ID - Working!
export const getExerciseSessionById = async (exerciseSessionID) => {
    const r = await axiosInstanceWithToken.get(`/exercise_session/${exerciseSessionID}`);
    return r.data;
}

// console.log(getExerciseSessionById(2))

// POST REQUESTS

// CREATE EXERCISE SESSION - Working!
export const createExerciseSession = async (exerciseSessionData = {user_id:5, workout_id:5}) => {
    const r = await axiosInstanceWithToken.post(`/exercise_session`, exerciseSessionData);
    return r.data;
};

// console.log(createExerciseSession());


// PUT REQUESTS

// EDIT EXERCISE SESSION BY ID - Working!
export const editExerciseSessionByID = async (exerciseSessionID, exerciseSessionData = {date: "2023-06-24T17:18:33.548Z"}) => {
    const r = await axiosInstanceWithToken.put(`/exercise_session/${exerciseSessionID}`, exerciseSessionData);
    return r.data;
};

// console.log(editExerciseSessionByID(3));

// DELETE REQUESTS

// DELETE EXERCISE BY ID - working!
export const deleteExerciseSessionByID = async (exerciseSessionID) => {
    const r = await axiosInstanceWithToken.delete(`/exercise_session/${exerciseSessionID}`);
    return r.data;
}

// console.log(deleteExerciseSessionByID(3));