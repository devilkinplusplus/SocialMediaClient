import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  facebookLogin,
  googleLogin,
  loginUser,
} from "../../../common/services/models/authService";
import { LoginRespone } from "../../../common/constants/responseParams/loginResponse";
import { AxiosResponse } from "axios";
import ToastService from "../../../common/services/tostifyService";
import { Backdrop, CircularProgress } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleLoginResponse } from "../../../common/constants/responseParams/googleLoginResponse";
import { LoginButton , FacebookProvider } from "react-facebook";
import { FacebookLoginResponse } from "../../../common/constants/responseParams/facebookLoginResponse";

function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setOpen(true);
    await loginUser(data)
      .then((res: AxiosResponse<LoginRespone>) => {
        if (!res.data.succeeded) {
          for (const error of res.data.errors) {
            ToastService.error(error);
          }
        } else {
          localStorage.setItem("accessToken", res.data.token.accessToken);
          navigate("/");
          ToastService.success("Welcome Back 👋");
        }
        setOpen(false);
      })
      .catch((err) => {});
  };

  const googleLoginAsync = async (response) => {
    setOpen(true);
    await googleLogin(response.credential)
      .then((res: AxiosResponse<GoogleLoginResponse>) => {
        if (res.data.succeeded) {
          localStorage.setItem("accessToken", res.data.token.accessToken);
          navigate("/");
          ToastService.success("Welcome Back 👋");
        }
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
      });
  };

  const facebookLoginAsync = async (response) => {
    try {
      setOpen(true);
      await facebookLogin(response.authResponse.accessToken)
        .then((res: AxiosResponse<FacebookLoginResponse>) => {
          if (res.data.succeeded) {
            localStorage.setItem("accessToken", res.data.token.accessToken);
            navigate("/");
            ToastService.success("Welcome Back 👋");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="container flex flex-col mx-auto justify-start items-center h-80 w-128 p-10 bg-gray-50 font-gemunu">
      <h2 className="text-purple-700 text-3xl font-semibold uppercase">
        Welcome to Your Digital Oasis
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-start items-start w-96 my-2">
          <label
            htmlFor="userName"
            className="block text-gray-400 font-medium mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="userName"
            placeholder="Enter your username"
            autoComplete="off"
            {...register("usernameOrEmail", {
              required: "Username is required",
            })}
            required
            className="border-2 text-gray-500 outline-none border-gray-300 rounded px-3 py-2 w-full focus:border-purple-500 duration-300"
          />
        </div>
        <div className="flex flex-col justify-start items-start w-96 my-2">
          <label
            htmlFor="password"
            className="block text-gray-400 font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="off"
            required
            {...register("password", {
              required: "Password is required",
            })}
            className="border-2 text-gray-500 outline-none border-gray-300 rounded px-3 py-2 w-full focus:border-purple-500 duration-300"
          />
        </div>
        <div className="flex justify-between items-center my-3">
          <Link
            to="/auth/register"
            className="text-purple-700 hover:underline duration-300"
          >
            Don't have an account?
          </Link>
          <Link
            to="/auth/forgotPassword"
            className="text-purple-700 hover:underline duration-300"
          >
            Forgot password?
          </Link>
        </div>
        <div className="flex flex-col w-full justify-between items-center my-3 space-y-1">
          <button
            className="bg-purple-600 py-2 px-14 w-full rounded-sm text-white hover:bg-purple-500 duration-300"
            type="submit"
          >
            Come in
          </button>
          <GoogleLogin onSuccess={googleLoginAsync} width="384px" />
          <button
            type="button"
            className="bg-blue-600 py-2 px-14 w-full rounded-sm text-white hover:bg-blue-500 duration-300"
          >
            <i className="fa-brands fa-facebook mr-2 text-lg"></i>
            <FacebookProvider appId="304740048631172">
              <LoginButton scope="email" onSuccess={facebookLoginAsync}>
                Login via Facebook
              </LoginButton>
            </FacebookProvider>
          </button>
        </div>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Login;
