import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { createPost } from "../../../common/services/models/postService";
import { AxiosResponse } from "axios";
import ToastService from "../../../common/services/tostifyService";
import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import { getUserIdFromToken } from "../../../common/services/utilities/jwtUtils";
import { getUser } from "../../../common/services/models/userService";
import { UserResponse } from "../../../common/constants/responseParams/userResponse";
import { useRecoilState } from "recoil";
import { userState } from "../../../common/services/states/userState";
import { postState } from "../../../common/services/states/postState";
import { Post } from "../../../common/constants/dtos/post";
import { User } from "../../../common/constants/dtos/user";
import { CreatePostResponse } from "../../../common/constants/responseParams/createPostResponse";
import { stringAvatar } from "../../../common/services/utilities/stringUtilities";

function PostCreate() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useRecoilState<User>(userState);
  const [posts, setPosts] = useRecoilState<Post[]>(postState);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
    reset,
    setValue,
    watch,
  } = useForm();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const jpgPngFiles = files.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    const mp4Files = files.filter((file) => file.type === "video/mp4");

    if (mp4Files.length > 0 && jpgPngFiles.length > 0) {
      ToastService.info(
        "You can't select video and image files at the same time",
        {
          position: "bottom-center",
        }
      );
      return;
    } else if (mp4Files.length > 0 && jpgPngFiles.length === 0) {
      if (mp4Files.length > 1) {
        ToastService.info("You can only select one MP4 file", {
          position: "bottom-center",
        });
        return;
      }
      setSelectedFiles([...mp4Files]);
    } else if (jpgPngFiles.length > 0 && mp4Files.length === 0) {
      setSelectedFiles([...jpgPngFiles]);
    } else {
      return;
    }
  };

  const onSubmit = async (data) => {
    setOpen(true);
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("files", file);
    }
    formData.append("content", data.content);
    formData.append("userId", user?.id);

    await createPost(formData)
      .then((res: AxiosResponse<CreatePostResponse>) => {
        if (res.data.succeeded) {
          reset();
          setPosts((prevPosts) => [res.data.post, ...prevPosts]);
          ToastService.success(
            "Hooray! Your post has been added to the community"
          );
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
      });
  };

  useEffect(() => {
    const userId = getUserIdFromToken();
    getUser(userId).then((res: AxiosResponse<UserResponse>) => {
      if (res.data.succeeded) {
        setUser(res.data.value);
      }
    });
  }, []);


  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-lg">
      {/* User info */}
      <div className="flex mb-4">
        {user?.profileImage ? (
          <img
            src={`https://localhost:7134/${user?.profileImage}`}
            alt="sa"
            className="w-10 h-10 rounded-full mr-4 object-cover"
          />
        ) : (
          <Avatar
            {...stringAvatar(`${user?.firstName} ${user?.lastName}`)}
            className="mr-4"
          />
        )}
        <div className="flex flex-col justify-start items-baseline">
          <span className="text-gray-700 text-xl">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="text-gray-400 text-xs">@{user?.userName}</span>
        </div>
      </div>
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <textarea
            id="postContent"
            rows={6}
            {...register("content")}
            placeholder="What's your on mind?"
            className="appearance-none bg-gray-100 rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:bg-white"
          ></textarea>
        </div>
        <div className="mb-4 flex items-center">
          <div>
            <input
              type="file"
              id="fileInput"
              {...register("files")}
              accept=".png, .jpg, .mp4"
              multiple
              className="w-0 h-0 opacity-0 absolute"
              onChange={onFileChange}
            />
            <label
              htmlFor="fileInput"
              className="bg-white text-gray-400 border-2 outline-none py-2 px-4 rounded cursor-pointer flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Upload File
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded duration-300"
          >
            Post
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

export default PostCreate;
