import axiosInstance from "../AxiosInstances/axiosInstance"

// POST - CREATE USER - Working!


export const createUser = async (userData = {
    email: "test@example.com",
    password: "password1"
}) => {
    console.log(userData)
    if (!userData) {
      return;
    } else {
      const response = await axiosInstance.post("/signup", { user: userData });
      if (response.headers.authorization) {
        window.localStorage.setItem("token", response.headers.authorization);
      }
      return response.data;
    }
  };

//  console.log("CU: ", createUser()) 