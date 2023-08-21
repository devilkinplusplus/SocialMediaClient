import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../common/services/states/userState";
import { User } from "../../../common/constants/dtos/user";
import { useForm } from "react-hook-form";
import { editUser } from "../../../common/services/models/userService";
import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import { AxiosResponse } from "axios";
import { BaseRespone } from "../../../common/constants/responseParams/baseResponse";
import ToastService from "../../../common/services/tostifyService";
import { stringAvatar } from '../../../common/services/utilities/stringUtilities';
import { useNavigate } from "react-router-dom";

function Account() {
  const [user, setUser] = useRecoilState<User>(userState);
  const formattedDate = user
    ? new Date(user?.date).toISOString().split("T")[0]
    : "";
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setOpen(true);
    await editUser(data)
      .then((res: AxiosResponse<BaseRespone>) => {
        if (res.data.succeeded) {
          ToastService.info("Updated ✅", {
            position: "bottom-center",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <div className="bg-white h-auto mx-10 my-5 pb-10 rounded-lg">
      <div className="bg-blue-600 h-20 rounded-t-lg flex justify-start items-center gap-x-2 text-white text-2xl">
        <p className="pl-6 cursor-pointer" onClick={() => navigate("/")}>
          <i className="fas fa-arrow-left"></i>
        </p>
        <p className="pl-2">Account Details</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-2">
        {user?.profileImage ? (
          <img
            className="h-24 w-24 object-cover rounded-md mt-4"
            alt="Profile sa"
            src={`https://localhost:7134/${user?.profileImage}`}
          />
        ) : (
          <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`)} sx={{ width: 76, height: 74 }} className="mt-4"/>
        )}
        <p className="text-2xl text-gray-700 font-medium tracking-wider">
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-start items-center gap-y-2 text-gray-500"
      >
        <input type="hidden" {...register("id")} defaultValue={user?.id} />
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="firstName">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            autoComplete="off"
            defaultValue={user?.firstName}
            {...register("firstName")}
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md focus:bg-con-white focus:border-blue-600 duration-200"
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="lastName">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            autoComplete="off"
            defaultValue={user?.lastName}
            {...register("lastName")}
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md focus:bg-con-white focus:border-blue-600 duration-200"
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            defaultValue={user?.userName}
            {...register("userName")}
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md focus:bg-con-white focus:border-blue-600 duration-200"
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="about">
            About
          </label>
          <textarea
            id="about"
            autoComplete="off"
            rows={5}
            defaultValue={user?.about}
            {...register("about")}
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md
         focus:bg-con-white focus:border-blue-600 duration-200"
          ></textarea>
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            autoComplete="off"
            defaultValue={formattedDate}
            {...register("date")}
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md focus:bg-con-white focus:border-blue-600 duration-200"
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start pt-3">
          <button
            type="submit"
            className="py-3 px-4 w-80 md:w-128 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl duration-200"
          >
            Save
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

export default Account;
