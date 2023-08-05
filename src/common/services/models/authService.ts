import axios from "axios";
import { LoginUser } from "../../constants/requestParams/loginUser";

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7134/api/auth',
});

export const loginUser = (data: LoginUser) => {
  return axiosInstance.post("", data);
};

export const confirmEmail = (email:string) => {
  return axiosInstance.post("/passwordReset",email);
}

export const confirmResetToken = (userId:string,resetToken:string) => {
  return axiosInstance.post("/verifyResetToken",{
    userId,resetToken
  })
}

export const googleLogin = (idToken:string) => {
  return axiosInstance.post("/googleLogin",{IdToken : idToken} );
}

export const facebookLogin = (authToken:string) => {
  return axiosInstance.post("/facebookLogin",{AuthToken:authToken})
}


export default axios;
