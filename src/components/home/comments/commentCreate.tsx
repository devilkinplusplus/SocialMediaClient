import React, { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../common/services/states/userState";
import { useForm } from "react-hook-form";
import { createComment } from "../../../common/services/models/commentService";
import { AxiosResponse } from "axios";
import { BaseRespone } from "../../../common/constants/responseParams/baseResponse";
import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import ToastService from "../../../common/services/tostifyService";
import { postState } from "../../../common/services/states/postState";
import { Post } from "../../../common/constants/dtos/post";
import { CommentResponse } from "../../../common/constants/responseParams/commentResponse";
import { stringAvatar } from '../../../common/services/utilities/stringUtilities';

function CommentCreate({ postId , setPosts }) {
  const user = useRecoilState(userState);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setOpen(true);
    await createComment({
      content: data.content,
      postId: postId,
      userId: user?.[0].id,
    })
      .then((res: AxiosResponse<CommentResponse>) => {
        if (!res.data.succeeded) {
          for (const error of res.data.errors) {
            ToastService.error(error, {
              position: "bottom-center",
            });
          }
        } else {
          reset();
          setPosts((prevPosts) =>
            prevPosts.map((val) =>
              val.id === postId
                ? {
                    ...val,
                    comments: [res.data.comment, ...val.comments]
                  }
                : val
            )
          );
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
    <div className="flex flex-col justify-start space-y-2 ">
      <div className="flex justify-start space-x-1 items-center bg-white-50">
        {user?.[0].profileImage ? (
          <img
            src={`https://localhost:7134/${user?.[0].profileImage}`}
            alt="sa"
            className="w-10 h-10 rounded-full mr-4 object-cover"
          />
        ) : (
          <Avatar {...stringAvatar(`${user?.[0].firstName} ${user?.[0].lastName}`)} className="mr-4" />
        )}
        <div className="flex flex-col justify-start items-baseline">
          <span className="text-gray-700 text-xl">You</span>
        </div>
      </div>
      <div className="flex flex-col justify-end space-y-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 justify-end items-end"
        >
          <textarea
            rows={3}
            {...register("content", {
              required: "Conten cannot be empty",
            })}
            className="w-full outline-none border-2 border-white hover:bg-gray-100 focus:bg-gray-100 rounded p-2 text-gray-700"
            placeholder="What's your thought?"
          ></textarea>
          <button
            type="submit"
            className="border-2 border-gray-500 text-gray-500 px-6 py-1 rounded hover:bg-gray-500 hover:text-white duration-300"
          >
            Share
          </button>
        </form>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
}

export default CommentCreate;
