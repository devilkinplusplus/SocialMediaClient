import axios from "axios";
import { CreateUser } from "../../constants/requestParams/createUser";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7134/api/users',
  });

export const createUser = (data: CreateUser) => {
  return axiosInstance.post("", {
    createUser: data,
  });
};

export const resetPassword = (userId:string,resetToken:string,newPassword:string)=>{
  return axiosInstance.post("/resetPassword",{userId,resetToken,newPassword})
}

export default axios;
