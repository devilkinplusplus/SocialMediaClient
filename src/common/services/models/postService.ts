import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7134/api/posts",
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

export const createPost = (request) => {
  return axiosInstance.post("/", request);
};

export const listPosts = (page: number, size: number, userId: string) => {
  return axiosInstance.get(`?page=${page}&size=${size}&userId=${userId}`);
};

export const toggleLikePost = (postId: string, userId: string) => {
  return axiosInstance.post("/like", { postId, userId });
};

export const getMyPosts = (page: number, size: number, userId: string) => {
  return axiosInstance.get(
    `/myPosts?page=${page}&size=${size}&userId=${userId}`
  );
};

export const deletePost = (id: string) => {
  return axiosInstance.put(`/archive?id=${id}`);
};

export const editPost = (request) => {
  return axiosInstance.put("", request);
};

export const getPost = (postId:string) => {
  return axiosInstance.get(`/post?postId=${postId}`)
}

export const deletePostImage = (postImageId:string) => {
  return axiosInstance.delete(`/deletePostImage?id=${postImageId}`)
}


export default axios;
