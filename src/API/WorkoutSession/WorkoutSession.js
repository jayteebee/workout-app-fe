import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL WORKOUT SESSIONS - Working!
export const getAllWorkoutSessions = async () => {
    const r = await axiosInstanceWithToken.get(`/workout_session`);
    return r.data
}

// console.log(getAllWorkoutSessions());

// GET WORKOUT SESSION BY ID - Working!
export const getWorkoutSessionById = async (workoutSessionID) => {
    const r = await axiosInstanceWithToken.get(`/workout_session/${workoutSessionID}`);
    return r.data;
}

// console.log(getWorkoutSessionById(2))

// POST REQUESTS

// CREATE WORKOUT SESSION - Working!
export const createWorkoutSession = async (workoutSessionData = {user_id:5, workout_id:5}) => {
    const r = await axiosInstanceWithToken.post(`/workout_session`, workoutSessionData);
    return r.data;
};

// console.log(createWorkoutSession());


// PUT REQUESTS

// EDIT WORKOUT SESSION BY ID - Working!
export const editWorkoutSessionByID = async (workoutSessionID, workoutSessionData = {date: "2023-06-24T17:18:33.548Z"}) => {
    const r = await axiosInstanceWithToken.put(`/workout_session/${workoutSessionID}`, workoutSessionData);
    return r.data;
};

// console.log(editWorkoutSessionByID(3));

// DELETE REQUESTS

// DELETE WORKOUT BY ID - working!
export const deleteWorkoutSessionByID = async (workoutSessionID) => {
    const r = await axiosInstanceWithToken.delete(`/workout_session/${workoutSessionID}`);
    return r.data;
}

// console.log(deleteWorkoutSessionByID(3));