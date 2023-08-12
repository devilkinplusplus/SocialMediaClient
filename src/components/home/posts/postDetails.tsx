import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect } from "react";
import { timeFormat } from "../../../common/services/utilities/timeFormat";
import {
  deletePost,
  toggleLikePost,
} from "../../../common/services/models/postService";
import { useRecoilState } from "recoil";
import { User } from "../../../common/constants/dtos/user";
import { userState } from "../../../common/services/states/userState";
import { Post } from "../../../common/constants/dtos/post";
import { postState } from "../../../common/services/states/postState";
import Slider from "react-slick";
import Modal from "@mui/material/Modal";
import CommentCreate from "../comments/commentCreate";
import CommentList from "../comments/commentList";
import { getUserIdFromToken } from "../../../common/services/utilities/jwtUtils";
import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AxiosResponse } from "axios";
import { BaseRespone } from "../../../common/constants/responseParams/baseResponse";
import ToastService from "../../../common/services/tostifyService";
import { confirmAlert } from "../../../common/services/alertifyService";
import { stringAvatar } from '../../../common/services/utilities/stringUtilities';
import { useNavigate } from "react-router-dom";

function PostDetails({ post , setPosts }) {
  const authenticatedUserId = getUserIdFromToken();
  const user = useRecoilState<User>(userState);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLike = async (postId: string) => {
    try {
      const res = await toggleLikePost(postId, user[0].id);
      if (res.data.succeeded) {
        setPosts((prevPosts) =>
          prevPosts.map((val) =>
            val.id === postId
              ? {
                  ...val,
                  isLiked: !val.isLiked,
                  likes: val.isLiked ? val.likes - 1 : val.likes + 1,
                }
              : val
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    confirmAlert(
      "Delete Request",
      "Are you sure to delete this post?",
      async () => {
        await deletePost(id)
          .then((res: AxiosResponse<BaseRespone>) => {
            if (res.data.succeeded) {
              ToastService.info("Deleted permanently");
              setPosts((prevposts) => prevposts.filter((val) => val.id !== id));
              handleCloseMenu();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      () => {}
    );
  };

  return (
    <div className="flex flex-col flex-wrap w-full space-y-4 bg-gray-50 py-4 rounded-lg shadow-lg  px-4">
      <div className="flex items-center space-x-4">
        {post.user.profileImage ? (
          <img
            className="h-10 w-10 rounded-full object-cover"
            alt="Profile sa"
            src={`https://localhost:7134/${
              post.user.profileImage ?? post.user.profileImage.path
            }`}
          />
        ) : (
          <Avatar {...stringAvatar(`${post.user?.firstName} ${post.user?.lastName}`)}  />
        )}
        <div className="ml-2 space-x-3">
          <span className="text-con-black text-lg">
            {post.user.firstName} {post.user.lastName}
          </span>
          <span className="text-gray-400 text-sm">
            {timeFormat(post.date).includes("-")
              ? "Just now"
              : timeFormat(post.date)}
          </span>
        </div>
      </div>
      <p className="text-lg text-gray-800">{post.content}</p>
      {post.files.length > 0 && (
        <div className="relative rounded-lg shadow-lg max-w-lg">
          {post.files[0].endsWith(".mp4") ? (
            <video controls className="w-full h-auto">
              <source
                src={`https://localhost:7134/${post.files[0]}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
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
              {post.files.map((file, index) => (
                <img
                  key={index}
                  src={`https://localhost:7134/${file}`}
                  alt={`Post as ${index}`}
                  className="w-full h-auto"
                />
              ))}
            </Slider>
          )}
        </div>
      )}

      <div className="flex items-center space-x-4 text-gray-600">
        <button
          onClick={() => handleLike(post.id)}
          className="flex items-center space-x-1 focus:outline-none thumbs-up"
          type="button"
        >
          <i
            className={`fas fa-thumbs-up ${post.isLiked && "text-blue-600"}`}
          ></i>
          <span
            className={`${post.isLiked ? "text-blue-600" : "text-gray-600"}`}
          >
            {post.likes} likes
          </span>
        </button>
        <button
          onClick={() => handleOpen()}
          className="flex items-center space-x-1 focus:outline-none comment"
        >
          <i className="fas fa-comment"></i>
          <span>{post.comments?.length}</span>
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center justify-center"
        >
          <div className="bg-white p-8 pb-20 rounded-lg w-256">
            <CommentCreate postId={post.id} setPosts={setPosts} />
            <div className="max-h-60 overflow-y-auto">
              <CommentList comments={post.comments} />
            </div>
          </div>
        </Modal>
        <button className="flex items-center space-x-1 focus:outline-none">
          <i className="fas fa-share-nodes"></i>
        </button>
        {authenticatedUserId === post.user.id && (
          <>
            <button
              className="flex items-center space-x-1 focus:outline-none"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => navigate(`/post/${post.id}`)}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              
              <MenuItem onClick={() => handleDelete(post.id)}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
