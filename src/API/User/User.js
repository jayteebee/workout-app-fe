import axiosInstance from "../AxiosInstances/axiosInstance";

// GET REQUESTS
// GET ALL USERS - WORKING!

export const getAllUsers = async () => {
    const r = await axiosInstance.get(`/users`);
    return r.data;
};

// console.log(getAllUsers());

// GET USER BY ID - WORKING!

export const getUserById = async (userID) => {
    const r = await axiosInstance.get(`/users/${userID}`);
    return r.data;
}

// console.log(getUserById(1))

