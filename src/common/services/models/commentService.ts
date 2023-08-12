import axios from "axios";
import { CreateCommentDto } from "../../constants/requestParams/createComment";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7134/api/comments",
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

export const createComment = (createCommentDto:Partial<CreateCommentDto>) => {
  return axiosInstance.post("/", {
    createCommentDto
  });
};

export const deleteComment = (id: string) => {
  return axiosInstance.put(`?id=${id}`);
};


export default axios;
