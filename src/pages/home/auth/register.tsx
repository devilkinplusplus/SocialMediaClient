import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../common/services/models/userService";
import { CreateUserRespone } from "../../../common/constants/responseParams/createUserResponse";
import { AxiosResponse } from "axios";
import ToastService from "../../../common/services/tostifyService";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await createUser(data)
      .then((res: AxiosResponse<CreateUserRespone>) => {
        if (!res.data.succeeded) {
          for (const error of res.data.errors) {
            ToastService.error(error);
          }
        } else {
          navigate("/auth/login");
          ToastService.info("Next step is login your account");
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="container flex flex-col mx-auto justify-start items-center h-128 w-128 p-5 bg-gray-50 font-gemunu">
      <h2 className="text-purple-700 text-3xl font-semibold uppercase mb-2">
        Welcome to Your Digital Oasis
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-start items-start w-96 my-1">
          <label
            htmlFor="firstname"
            className="block text-gray-400 font-medium mb-1"
          >
            Firstname
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter your firstname"
            autoComplete="off"
            required
            {...register("firstName", {
              required: "Firstname is required",
            })}
            className="border-2 text-gray-500 outline-none border-gray-300 rounded px-3 py-2 w-full focus:border-purple-500 duration-300"
          />
        </div>
        <div className="flex flex-col justify-start items-start w-96 my-1">
          <label
            htmlFor="lastname"
            className="block text-gray-400 font-medium mb-1"
          >
            Lastname
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter your lastname"
            autoComplete="off"
            required
            {...register("lastName", {
              required: "Lastname is required",
            })}
            className="border-2 text-gray-500 outline-none border-gray-300 rounded px-3 py-2 w-full focus:border-purple-500 duration-300"
          />
        </div>
        <div className="flex flex-col justify-start items-start w-96 my-1">
          <label
            htmlFor="email"
            className="block text-gray-400 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            autoComplete="off"
            required
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="border-2 text-gray-500 outline-none border-gray-300 rounded px-3 py-2 w-full focus:border-purple-500 duration-300"
          />
          {errors.email?.message === "Invalid email address" && (
            <span className="px-3 py-1 w-full mt-1 rounded bg-red-200 text-red-400 text-center">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-start items-start w-96 my-1">
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
            required
            {...register("username", {
              required: "Username is required",
            })}
            className="border-2 text-gray-500 outline-none border-gray-300 rounded px-3 py-2 w-full focus:border-purple-500 duration-300"
          />
        </div>
        <div className="flex flex-col justify-start items-start w-96 my-1">
          <label
            htmlFor="birthDate"
            className="block text-gray-400 font-medium mb-1"
          >
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            autoComplete="off"
            required
            {...register("date", {
              required: "Date is required",
            })}
            className="border-2 text-gray-500 outline-none border-gray-300 rounded px-3 py-2 w-full focus:border-purple-500 duration-300"
          />
        </div>
        <div className="flex flex-col justify-start items-start w-96 my-1">
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
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="border-2 text-gray-500 outline-none border-gray-300 rounded px-3 py-2 w-full focus:border-purple-500 duration-300"
          />
          {errors.password?.message ===
            "Password must be at least 6 characters" && (
            <span className="px-3 py-1 w-full mt-1 rounded bg-red-200 text-red-400 text-center">
              {errors.password?.message}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center my-3">
          <Link
            to="/auth/login"
            className="text-purple-700 hover:underline duration-300"
          >
            Already have an account?
          </Link>
        </div>
        <button
          className="bg-purple-600 py-2 px-14 w-full rounded-sm text-white hover:bg-purple-500 duration-300"
          type="submit"
        >
          Let's goo!
        </button>
      </form>
    </div>
  );
}

export default Register;
