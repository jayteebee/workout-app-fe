import axiosInstance from "../AxiosInstances/axiosInstance";

export const getAllUsers = async () => {
    const r = await axiosInstance.get(`/users`);
    return r.data;
};

