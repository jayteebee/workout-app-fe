import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL WORKOUTS - Working!
export const getAllWorkouts = async () => {
    const r = await axiosInstanceWithToken.get(`/workouts`);
    return r.data
}

// console.log(getAllWorkouts());


// GET WORKOUT BY ID - Working!
 export const getWorkoutById = async (workoutID) => {
    const r = await axiosInstanceWithToken.get(`/workouts/${workoutID}`);
    return r.data;
}

// console.log(getWorkoutById(1))

// GET EXERCISES IN WORKOUT - Working!
export const getExercisesInWorkout = async (workoutID) => {
    const r = await axiosInstanceWithToken.get(`/workouts/${workoutID}/exercises`);
    return r.data;
}

// console.log(getExercisesInWorkout(1));


// POST REQUESTS

// CREATE WORKOUT - Working!
export const createWorkout = async (workoutData = {user_id:5, name: "Upper Second"}) => {
    const r = await axiosInstanceWithToken.post(`/workouts`, workoutData);
    return r.data;
};

// console.log(createWorkout());

// ADD EXERCISE TO WORKOUT - Working!
export const addExerciseToWorkout = async (workoutID, exerciseData = {exercise_id: 2, sets:1, reps:10, weight:100}) => {
    const r = await axiosInstanceWithToken.post(`/workouts/${workoutID}/exercises`, exerciseData);
    return r.data;
}

console.log(addExerciseToWorkout(4));