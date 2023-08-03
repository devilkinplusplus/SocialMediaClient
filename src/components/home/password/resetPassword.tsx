import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { confirmResetToken } from "../../../common/services/models/authService";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { BaseRespone } from "../../../common/constants/responseParams/baseResponse";
import ToastService from "../../../common/services/tostifyService";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../../common/services/models/userService";

function ResetPassword() {
  const navigate = useNavigate();
  const { userId, resetToken } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    confirmResetToken(userId, resetToken)
      .then((res: AxiosResponse<BaseRespone>) => {
        if (!res.data.succeeded) {
          navigate("/auth/login");
          ToastService.error("You can use this link only once");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      await resetPassword(userId, resetToken, data.password).then(
        (res: AxiosResponse<BaseRespone>) => {
          if (res.data.succeeded) {
            navigate("/auth/login");
            ToastService.success("Congrats for your new password 🥳");
          }
        }
      );
    } else {
      ToastService.error("Confirm your password");
    }
  };

  return (
    <>
      <div className="flex flex-col font-gemunu text-gray-600 justify-center items-center py-10 px-5 rounded-lg bg-con-white h-auto mx-5 my-10">
        <p className="text-2xl font-medium">New Password Request</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-1 items-start justify-between font-medium"
        >
          <span className="pl-1">New Password</span>
          <input
            type="password"
            placeholder="New Password.."
            {...register("password")}
            className="py-2 px-3 w-80 md:w-128 outline-none rounded-md focus:bg-gray-100 duration-200 border-2 border-white focus:border-blue-500"
          />
          <span className="pl-1">Confirm Password</span>
          <input
            type="password"
            placeholder="Repeat Password.."
            {...register("confirmPassword")}
            className="py-2 px-3 w-80 md:w-128 outline-none rounded-md focus:bg-gray-100 duration-200 border-2 border-white focus:border-blue-500"
          />
          <button
            type="submit"
            className="py-2 px-4 mt-2 w-full bg-green-400 text-white rounded-md hover:bg-green-500"
          >
            Confirm
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
