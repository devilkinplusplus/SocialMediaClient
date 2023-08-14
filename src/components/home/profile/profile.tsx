import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../../../common/services/utilities/jwtUtils";
import { useRecoilState } from "recoil";
import { User } from "../../../common/constants/dtos/user";
import { userState } from "../../../common/services/states/userState";
import { uploadProfilePicture } from "../../../common/services/models/userService";
import { AxiosResponse } from "axios";
import { BaseRespone } from "../../../common/constants/responseParams/baseResponse";
import ToastService from "../../../common/services/tostifyService";
import Modal from "@mui/material/Modal";
import MyRanks from "./myRanks";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../common/services/utilities/stringUtilities";

function Profile() {
  const user = useRecoilState<User>(userState);
  const { userId } = useParams();
  const navigate = useNavigate();
  const userIdFromToken = getUserIdFromToken();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tabIndex) => {
    if (tabIndex === 1) {
      navigate(`/profile/posts/${userId}`);
    }else if(tabIndex === 2){
      navigate(`/profile/followers/${userId}`)
    }else if(tabIndex === 3){
      navigate(`/profile/followings/${userId}`)
    }
    setActiveTab(tabIndex);
  };

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
  };

  const saveFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user[0]?.id);
    await uploadProfilePicture(formData)
      .then((res: AxiosResponse<BaseRespone>) => {
        if (res.data.succeeded) {
          ToastService.success("Updated successfully ✅");
          handleClose();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-start h-32 p-10">
        <div className="flex justify-start space-x-1 items-center">
          <div className="relative inline-flex items-center">
            {user[0]?.profileImage ? (
              <img
                className="w-20 h-20 rounded-full mr-4 object-cover"
                alt="Profile sa"
                src={`https://localhost:7134/${user[0]?.profileImage}`}
              />
            ) : (
                <Avatar
                  {...stringAvatar(
                    `${user[0]?.firstName} ${user[0]?.lastName}`
                  )}
                  className="w-20 h-20 mr-4"
                  sx={{ width: 76, height: 74 }}
                />
            )}
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
          </div>

          <div className="flex flex-col justify-center items-start space-y-1">
            <span className="text-3xl text-gray-600">
              {user[0]?.firstName} {user[0]?.lastName}
            </span>
            <span className="text-xs text-gray-400">@{user[0]?.userName}</span>
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
                type="button"
                className="bg-blue-500 text-white hover:bg-blue-400 duration-300 px-6 py-1.5 rounded"
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-100 border-t-gray-300 h-20 flex flex-col flex-wrap text-justify space-y-1.5 justify-start items-start px-10 py-3">
        <p className="text-gray-500 text-sm font-semibold">About</p>
        <span className="text-gray-400 text-md">{user[0]?.about}</span>
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
          <MyRanks />
        </div>
      )}
    </>
  );
}

export default Profile;
