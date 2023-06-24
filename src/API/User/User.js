import axiosInstance from "../AxiosInstances/axiosInstance";

// GET REQUESTS
// GET ALL USERS - WORKING!

export const getAllUsers = async () => {
    const r = await axiosInstance.get(`/users`);
    return r.data;
};

// console.log(getAllUsers());

