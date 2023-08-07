import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7134/api/posts',
});

axiosInstance.interceptors.request.use(
    (config) => {
      const authToken = localStorage.getItem('accessToken');
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const createPost = (request) =>{
    return axiosInstance.post("/",request)
}

export const listPosts = (page:number,size:number,userId:string) => {
   return axiosInstance.get(`?page=${page}&size=${size}&userId=${userId}`)
}

export default axios;
