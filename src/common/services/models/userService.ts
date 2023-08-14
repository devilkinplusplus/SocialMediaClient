import axios from "axios";
import { CreateUser } from "../../constants/requestParams/createUser";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7134/api/users",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("accessToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createUser = (data: CreateUser) => {
  return axiosInstance.post("", {
    createUser: data,
  });
};

export const resetPassword = (
  userId: string,
  resetToken: string,
  newPassword: string
) => {
  return axiosInstance.post("/resetPassword", {
    userId,
    resetToken,
    newPassword,
  });
};

export const getUser = (userId: string) => {
  return axiosInstance.get(`/user/${userId}`);
};

export const editUser = (data) => {
  return axiosInstance.put("",{
    editUserDto:data
  })
}

export const uploadProfilePicture = (data) => {
  return axiosInstance.post("/upload",data);
}

export const getSuggestedPeople = (page:number,size:number) => {
  return axiosInstance.get(`/suggesteds?page=${page}&size=${size}`)
}

export default axios;
