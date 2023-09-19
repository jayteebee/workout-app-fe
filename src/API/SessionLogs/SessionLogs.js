import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";

// GET REQUESTS

// GET ALL SESSION LOGS - working
export const getAllSessionLogs = async () => {
    const r = await axiosInstanceWithToken.get(`/session_logs`);
    return r.data
}

// console.log(getAllSessionLogs());

// POST REQUESTS

// CREATE SESSION LOGS - Working!
export const createSessionLogs = async (SessionLogData) => {
    const r = await axiosInstanceWithToken.post(`/session_logs`, SessionLogData);
    return r.data;
};

// console.log(createSessionLogs());