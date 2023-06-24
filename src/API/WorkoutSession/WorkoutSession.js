import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL WORKOUT SESSIONS - Working!
export const getAllWorkoutSessions = async () => {
    const r = await axiosInstanceWithToken.get(`/workout_session`);
    return r.data
}

// console.log(getAllWorkoutSessions());

// GET WORKOUT BY ID - Working!
export const getWorkoutSessionById = async (workoutSessionID) => {
    const r = await axiosInstanceWithToken.get(`/workout_session/${workoutSessionID}`);
    return r.data;
}

// console.log(getWorkoutSessionById(2))

// POST REQUESTS

// CREATE WORKOUT - Working!
export const createWorkoutSession = async (workoutSessionData = {user_id:5, workout_id:5}) => {
    const r = await axiosInstanceWithToken.post(`/workout_session`, workoutSessionData);
    return r.data;
};

// console.log(createWorkoutSession());