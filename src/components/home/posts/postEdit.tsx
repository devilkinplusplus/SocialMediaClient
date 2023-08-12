import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import {
  deletePostImage,
  editPost,
  getPost,
} from "../../../common/services/models/postService";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { PostResponse } from "../../../common/constants/responseParams/postResponse";
import { Post } from "../../../common/constants/dtos/post";
import Slider from "react-slick";
import ToastService from "../../../common/services/tostifyService";
import { useForm } from "react-hook-form";
import { BaseRespone } from "../../../common/constants/responseParams/baseResponse";
import { Backdrop, CircularProgress } from "@mui/material";
import { EditPostResponse } from "../../../common/constants/responseParams/editPostResponse";
import { confirmAlert } from "../../../common/services/alertifyService";

function PostEdit() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | any>();
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fetchData = () => {
    getPost(id)
      .then((res: AxiosResponse<PostResponse>) => {
        if (res.data.succeeded) {
          setPost(res.data.value);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    formData.append("id", post?.id);

    await editPost(formData)
      .then((res: AxiosResponse<EditPostResponse>) => {
        if (res.data.succeeded) {
          ToastService.success("Changes saved ✅");
          setPost(res.data.post);
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

  const handleDeleteImage = async (id: string) => {
    confirmAlert(
      "Delete Request",
      "Are you sure to delete ?",
      async () => {
        await deletePostImage(id)
          .then((res: AxiosResponse<BaseRespone>) => {
            if (res.data.succeeded) {
              ToastService.success("Changes saved ✅");
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      () => {}
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-start items-start space-y-2 w-full bg-white p-8 rounded-lg shadow-lg">
      <h3 className="pb-4 pl-80 text-xl text-gray-500 tracking-wider">
        You can edit your post now !
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        method="POST"
        encType="multipart/form-data"
      >
        <input type="hidden" {...register("id")} defaultValue={post?.id} />
        <div className="mb-4">
          <textarea
            id="postContent"
            rows={6}
            placeholder="What's your on mind?"
            {...register("content")}
            defaultValue={post?.content}
            className="appearance-none bg-gray-100 rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:bg-white"
          ></textarea>
        </div>

        <div className="my-4 flex items-center">
          <div>
            <input
              type="file"
              id="fileInput"
              accept=".png, .jpg, .mp4"
              multiple
              {...register("files")}
              onChange={onFileChange}
              className="w-0 h-0 opacity-0 absolute"
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
            Save
          </button>
        </div>
      </form>
      <div className="flex justify-start items-start pt-2">
        {post?.files?.length > 0 && (
          <div className="relative rounded-lg shadow-lg max-w-lg">
            {post?.files[0].endsWith(".mp4") ? (
              <div className="relative">
                <video controls className="w-full h-auto">
                  <source
                    src={`https://localhost:7134/${post.files[0]}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <button
                  className="absolute top-2 right-2 bg-red-500 px-1 rounded text-white"
                  onClick={() => handleDeleteImage(post?.file[0].fileId)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ) : (
              <Slider
                className="overflow-hidden"
                dots={false}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={2000}
                cssEase={"linear"}
                pauseOnHover={true}
              >
                {post?.fileInfos?.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={`https://localhost:7134/${file.path}`}
                      alt={`Post as ${index}`}
                      className="w-full h-auto"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 px-1 rounded text-white"
                      onClick={() => handleDeleteImage(file.fileId)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        )}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}

export default PostEdit;
