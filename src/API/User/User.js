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


// PUT REQUESTS
// EDIT USER BY ID - WORKING!
export const updateUser = async (userID, userData = {weight: 200}) => {
    const r = await axiosInstance.put(`/users/${userID}`, userData);
    return r.data;
}

// console.log(updateUser(1))

// DELETE REQUESTS
// DELETE USER BY ID - WORKING!
export const deleteUser = async (userID) => {
    const r = await axiosInstance.delete(`/users/${userID}`);
    return r.data;
}

// console.log(deleteUser(2))