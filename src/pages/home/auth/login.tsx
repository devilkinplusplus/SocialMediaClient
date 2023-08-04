import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../common/services/models/authService";
import { LoginRespone } from "../../../common/constants/responseParams/loginResponse";
import { AxiosResponse } from "axios";
import ToastService from "../../../common/services/tostifyService";
import { Backdrop,CircularProgress } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);


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
        setOpen(false)
      })
      .catch((err) => {});
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
        <button
          className="bg-purple-600 py-2 px-14 w-full rounded-sm text-white hover:bg-purple-500 duration-300"
          type="submit"
        >
          Go in
        </button>
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Login;
