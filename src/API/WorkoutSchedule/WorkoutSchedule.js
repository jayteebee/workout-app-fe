import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL WORKOUT Schedules  - Working!
export const getAllWorkoutSchedules = async () => {
    const r = await axiosInstanceWithToken.get(`/workout_schedules`);
    return r.data
}

// console.log(getAllWorkoutSchedules());


// GET WORKOUT SCHEDULE BY ID - Working!
export const getWorkoutScheduleById = async (workoutScheduleID) => {
    const r = await axiosInstanceWithToken.get(`/workout_schedules/${workoutScheduleID}`);
    return r.data;
}

// console.log(getWorkoutScheduleById(20))


// PUT REQUESTS

// EDIT WORKOUT SCHEDULE BY ID - Working!
export const editWorkoutScheduleByID = async (workoutScheduleID, workoutScheduleData = {completed: true}) => {
    const r = await axiosInstanceWithToken.put(`/workout_schedules/${workoutScheduleID}`, workoutScheduleData);
    return r.data;
};

// console.log(editWorkoutScheduleByID(20));


// DELETE REQUESTS

// DELETE WORKOUT SCHEDULE BY ID - working!
export const deleteWorkoutScheduleByID = async (workoutScheduleID) => {
    const r = await axiosInstanceWithToken.delete(`/workout_schedules/${workoutScheduleID}`);
    return r.data;
}

// console.log(deleteWorkoutScheduleByID(20));