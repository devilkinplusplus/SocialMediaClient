import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword } from "../../../common/services/models/userService";
import { getUserIdFromToken } from "../../../common/services/utilities/jwtUtils";
import { BaseRespone } from "../../../common/constants/responseParams/baseResponse";
import { AxiosResponse } from "axios";
import ToastService from "../../../common/services/tostifyService";

function ChangePassword({ close }) {
  const userId = getUserIdFromToken();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setOpen(true);
    if (data.password === data.confirmPassword) {
      await changePassword(userId, data.password)
        .then((res: AxiosResponse<BaseRespone>) => {
          if (res.data.succeeded) {
            ToastService.success("Changes saved ✅");
          } else {
            for (const error of res.data.errors) {
              ToastService.error(error);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setOpen(false);
          close();
        });
    } else {
      ToastService.error("Confirm your password 🫤");
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col text-gray-600 justify-center items-center p-5 rounded-lg bg-con-white h-auto mx-5">
      <p className="text-2xl font-medium tracking-wider">Change Password</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-1 items-start justify-between"
      >
        <span className="pl-1 text-gray-300">New Password</span>
        <input
          type="password"
          placeholder="New Password.."
          required
          {...register("password", {
            required: "Password is required",
          })}
          className="py-2 px-3 w-80 md:w-128 outline-none rounded-md focus:bg-gray-100 duration-200 border-2 border-white focus:border-blue-500"
        />
        <span className="pl-1 text-gray-300">Confirm Password</span>
        <input
          type="password"
          placeholder="Repeat Password.."
          required
          {...register("confirmPassword", {
            required: "Password is required",
          })}
          className="py-2 px-3 w-80 md:w-128 outline-none rounded-md focus:bg-gray-100 duration-200 border-2 border-white focus:border-blue-500"
        />
        <button
          type="submit"
          className="py-2 px-4 mt-2 w-full bg-green-400 text-white rounded-md hover:bg-green-500 duration-300"
        >
          Confirm
        </button>
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

export default ChangePassword;
