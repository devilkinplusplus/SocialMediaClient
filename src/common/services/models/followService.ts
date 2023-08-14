import axios from "axios";
import { CreateCommentDto } from "../../constants/requestParams/createComment";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7134/api/follows",
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

export const getFollowers = (id:string,page:number,size:number) =>{
    return axiosInstance.get(`/followers?id=${id}&page=${page}&size=${size}`)
}

export const getFollowings = (id:string,page:number,size:number) =>{
    return axiosInstance.get(`/followings?id=${id}&page=${page}&size=${size}`)
}

export const followUser = (followerId:string,followingId:string) =>{
    return axiosInstance.post("",{
      followerId,followingId
    })
}

export default axios;
