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

export default axios;
