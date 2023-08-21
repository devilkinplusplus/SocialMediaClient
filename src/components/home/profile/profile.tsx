import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../../../common/services/utilities/jwtUtils";
import { User } from "../../../common/constants/dtos/user";
import {
  getUser,
  uploadProfilePicture,
} from "../../../common/services/models/userService";
import { AxiosResponse } from "axios";
import { BaseRespone } from "../../../common/constants/responseParams/baseResponse";
import ToastService from "../../../common/services/tostifyService";
import Modal from "@mui/material/Modal";
import MyRanks from "./myRanks";
import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import { stringAvatar } from "../../../common/services/utilities/stringUtilities";
import { UserResponse } from "../../../common/constants/responseParams/userResponse";
import { followUser } from "../../../common/services/models/followService";
import { FollowResponse } from "../../../common/constants/responseParams/followResponse";
import { useRecoilState } from "recoil";
import { Following } from "../../../common/constants/dtos/following";
import { followingState } from "../../../common/services/states/userState";

function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userIdFromToken = getUserIdFromToken();
  const [user, setUser] = useState<User>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [followings, setFollowings] =
    useRecoilState<Following[]>(followingState);
  const [requested, setRequested] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [openLoad, setOpenLoad] = useState(false);
  const authId = getUserIdFromToken();

  const handleTabClick = (tabIndex) => {
    if (tabIndex === 1) {
      navigate(`/profile/posts/${userId}`);
    } else if (tabIndex === 2) {
      navigate(`/profile/followers/${userId}`);
    } else if (tabIndex === 3) {
      navigate(`/profile/followings/${userId}`);
    }
    setActiveTab(tabIndex);
  };

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
  };

  const saveFile = async () => {
    setOpenLoad(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user?.id);
    await uploadProfilePicture(formData)
      .then((res: AxiosResponse<BaseRespone>) => {
        if (res.data.succeeded) {
          ToastService.success("Updated successfully ✅");
          handleClose();
        }
      })
      .catch((err) => console.log(err)).finally(()=>{
        setOpenLoad(false);
      });
  };

  const handleFollow = async () => {
    setOpenLoad(true);
    await followUser(userId, user.id).then(
      (res: AxiosResponse<FollowResponse>) => {
        if (res.data.succeeded) {
          if (res.data.followState.isUnfollowed === true) {
            setFollowings((prev) =>
              prev.filter(
                (following) =>
                  following.id !== res.data.followState.following.id
              )
            );
            setIsFollowing(false);
          } else if (res.data.followState.isFollowing === true) {
            setFollowings((prevFollowings) => [
              res.data.followState.following,
              ...prevFollowings,
            ]);
            setIsFollowing(true);
          } else if (res.data.followState.hasRequest === true) {
            setRequested(true);
          }
        }
      }
    ).finally(()=>{
      setOpenLoad(false)
    });
  };

  useEffect(() => {
    setOpenLoad(true);
    getUser(userId, authId, userId)
      .then((res: AxiosResponse<UserResponse>) => {
        if (res.data.succeeded) {
          setUser(res.data.value);
        }
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setOpenLoad(false)
      });
  }, [userId]);

  return (
    <>
      <div className="flex flex-col justify-center items-start h-32 p-10">
        <div className="flex justify-start space-x-1 items-center">
          <div className="relative inline-flex items-center">
            {user?.profileImage ? (
              <img
                className="w-20 h-20 rounded-full mr-4 object-cover"
                alt="Profile sa"
                src={`https://localhost:7134/${user?.profileImage}`}
              />
            ) : (
              <Avatar
                {...stringAvatar(`${user?.firstName} ${user?.lastName}`)}
                className="w-20 h-20 mr-4"
                sx={{ width: 76, height: 74 }}
              />
            )}
            {userIdFromToken === userId && (
              <div
                className="flex items-end absolute inset-0 pl-16 text-xs cursor-pointer"
                onClick={() => handleOpen()}
              >
                <label className="w-6 h-6 flex items-center justify-center bg-gray-400 hover:bg-gray-300 duration-300 rounded-full">
                  <i className="fas fa-cloud-upload-alt text-white cursor-pointer"></i>
                </label>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="flex items-center justify-center"
                >
                  <div className="bg-white p-8 pb-20 rounded-lg w-256 text-center">
                    <label
                      htmlFor="fileUpload"
                      className="block p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <span className="text-gray-600 text-center">
                        Upload Profile Image
                      </span>
                      <input
                        id="fileUpload"
                        type="file"
                        accept=".jpg,.png"
                        className="hidden"
                        onChange={onFileSelect}
                      />
                    </label>
                    <button
                      type="button"
                      className="bg-blue-500 text-white hover:bg-blue-400 duration-300 rounded px-6 py-2 my-2 w-full"
                      onClick={() => saveFile()}
                    >
                      Save
                    </button>
                  </div>
                </Modal>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center items-start space-y-1">
            <span className="text-3xl text-gray-600">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-gray-400">@{user?.userName}</span>
          </div>
          <div className="pl-2 flex gap-x-1">
            {userIdFromToken === userId ? (
              <button
                onClick={() => navigate(`/account/`)}
                type="button"
                className="bg-gray-500 text-white hover:bg-gray-400 duration-300 px-6 py-1.5 rounded"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => handleFollow()}
                type="button"
                className="bg-blue-500 text-white hover:bg-blue-400 duration-300 px-6 py-1.5 rounded"
              >
                {isFollowing === true || user?.doIFollow === true
                  ? "Unfollow"
                  : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-100 border-t-gray-300 h-20 flex flex-col flex-wrap text-justify space-y-1.5 justify-start items-start px-10 py-3">
        <p className="text-gray-500 text-sm font-semibold">About</p>
        <span className="text-gray-400 text-md">{user?.about}</span>
      </div>
      <div className="flex px-10 py-3 border-t-2 border-gray-300  text-lg justify-start space-x-10 items-center text-gray-500">
        <span
          className={`${
            activeTab === 0
              ? "text-purple-500"
              : "hover:text-gray-400 duration-200"
          } cursor-pointer`}
          onClick={() => handleTabClick(0)}
        >
          Ranks
        </span>
        <span
          className={`${
            activeTab === 1
              ? "text-purple-500"
              : "hover:text-gray-400 duration-200"
          } cursor-pointer`}
          onClick={() => handleTabClick(1)}
        >
          Posts
        </span>
        <span
          className={`${
            activeTab === 2
              ? "text-purple-500"
              : "hover:text-gray-400 duration-200"
          } cursor-pointer`}
          onClick={() => handleTabClick(2)}
        >
          Followers
        </span>
        <span
          className={`${
            activeTab === 3
              ? "text-purple-500"
              : "hover:text-gray-400 duration-200"
          } cursor-pointer`}
          onClick={() => handleTabClick(3)}
        >
          Followings
        </span>
      </div>
      {activeTab === 0 && (
        <div className="flex px-10 py-3 bg-gray-100 text-lg justify-start space-3 text-gray-500 h-auto">
          <MyRanks userId={userId} />
        </div>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoad}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default memo(Profile);
