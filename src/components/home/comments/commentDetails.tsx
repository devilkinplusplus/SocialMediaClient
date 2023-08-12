import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { stringAvatar } from "../../../common/services/utilities/stringUtilities";
import { getUserIdFromToken } from "../../../common/services/utilities/jwtUtils";
import { confirmAlert } from "../../../common/services/alertifyService";
import { deleteComment } from "../../../common/services/models/commentService";
import { AxiosResponse } from "axios";
import { BaseRespone } from "../../../common/constants/responseParams/baseResponse";
import ToastService from "../../../common/services/tostifyService";
import { useRecoilState } from "recoil";
import { Post } from "../../../common/constants/dtos/post";
import { postState } from "../../../common/services/states/postState";

function CommentDetails({ comment }) {
  const authUserId = getUserIdFromToken();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useRecoilState<Post[]>(postState);

  const handleDeleteComment = async (id: string) => {
    confirmAlert(
      "Delete Request",
      "Are you sure to delete ?",
      async () => {
        setOpen(true);
        await deleteComment(id)
          .then((res: AxiosResponse<BaseRespone>) => {
            if (res.data.succeeded) {
              ToastService.info("Deleted permanently ✅");
              setPosts((prevPosts) =>
                prevPosts.map((post) => {
                  if (post.comments.some((comment) => comment.id === id)) {
                    return {
                      ...post,
                      comments: post.comments.filter(
                        (comment) => comment.id !== id
                      ),
                    };
                  }
                  return post;
                })
              );
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setOpen(false);
          });
      },
      () => {}
    );
  };

  return (
    <div className="flex flex-col flex-wrap w-full space-y-4 bg-gray-50 py-4 rounded-lg shadow-lg px-4">
      <div className="flex items-center space-x-4">
        {comment.user?.profileImage ? (
          <img
            src={`https://localhost:7134/${comment.user?.profileImage?.path}`}
            alt="pp"
            className="w-10 h-10 rounded-full mr-4 object-cover"
          />
        ) : (
          <Avatar
            {...stringAvatar(
              `${comment.user?.firstName} ${comment.user?.lastName}`
            )}
          />
        )}
        <div className="ml-2 space-x-3">
          <span className="text-con-black text-lg">
            {comment?.user?.firstName} {comment?.user?.lastName}
          </span>
          {authUserId === comment?.user?.id && (
            <button
              type="button"
              onClick={() => handleDeleteComment(comment?.id)}
            >
              <i className="fas fa-trash pl-10 text-gray-600"></i>
            </button>
          )}
        </div>
      </div>
      <p className="text-lg text-gray-800">{comment?.content}</p>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}

export default CommentDetails;
