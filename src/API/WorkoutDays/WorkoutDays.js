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

// console.log(getWorkoutDayById(2))


// POST REQUESTS

// CREATE WORKOUT DAY - Working!
export const createWorkoutDay = async (workoutDayData = {user_id:5, days_of_week:[1,3,5]}) => {
    const r = await axiosInstanceWithToken.post(`/workout_days`, workoutDayData);
    return r.data;
};

// console.log(createWorkoutDay());


// PUT REQUESTS

// EDIT WORKOUT DAYS BY ID - Working!
export const editWorkoutDayByID = async (workoutDayID, workoutDayData = {days_of_week: [0,1,4]}) => {
    const r = await axiosInstanceWithToken.put(`/workout_days/${workoutDayID}`, workoutDayData);
    return r.data;
};

// console.log(editWorkoutDayByID(2));


// DELETE REQUESTS

// DELETE WORKOUT DAY BY ID - working!
export const deleteWorkoutDayByID = async (workoutDayID) => {
    const r = await axiosInstanceWithToken.delete(`/workout_days/${workoutDayID}`);
    return r.data;
}

// console.log(deleteWorkoutDayByID(2));