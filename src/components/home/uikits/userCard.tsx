import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { stringAvatar } from "../../../common/services/utilities/stringUtilities";
import { followUser } from "../../../common/services/models/followService";
import { getUserIdFromToken } from "../../../common/services/utilities/jwtUtils";
import { AxiosResponse } from "axios";
import { FollowResponse } from "../../../common/constants/responseParams/followResponse";
import { useRecoilState } from "recoil";
import { Following } from "../../../common/constants/dtos/following";
import { followingState } from "../../../common/services/states/userState";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const userId = getUserIdFromToken();
  const [followings, setFollowings] = useRecoilState<Following[]>(followingState);
  const [requested, setRequested] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFollow = async () => {
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
            setIsFollowing(false)
            user.followerCount -= 1;
          } else if (res.data.followState.isFollowing === true) {
            setFollowings((prevFollowings) => [
              res.data.followState.following,
              ...prevFollowings,
            ]);
            user.followerCount += 1;
            setIsFollowing(true);
          } else if (res.data.followState.hasRequest === true) {
            setRequested(true);
          }
        }
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-56 h-96 my-2 flex flex-col">
      {/* Profile Image */}
      <div className="flex justify-center items-center m-4 cursor-pointer" onClick={() => navigate(`/profile/${user.id}`)}>
        {user?.profileImage ? (
          <img
            className="h-24 w-24 object-cover rounded-full"
            alt="Profile sa"
            src={`https://localhost:7134/${user?.profileImage}`}
          />
        ) : (
          <Avatar
            {...stringAvatar(`${user?.firstName} ${user?.lastName}`)}
            className="w-20 h-20 mr-4"
            sx={{ width: 96, height: 96 }}
          />
        )}
      </div>
      <div className="px-8 py-4 flex-grow flex flex-col justify-between">
        {/* Username */}
        <div className="flex flex-col justify-center items-center font-medium text-gray-800">
          <p className="text-2xl flex-wrap text-center">
            {user?.firstName} {user?.lastName}
          </p>
          <div className="text-sm text-gray-400 mb-1">@{user?.userName}</div>
        </div>

        {/* Extras */}
        <div className="flex justify-evenly mt-auto mb-3">
          <div className="w-1/3 text-center">
            <div className="font-bold text-lg text-gray-800">
              {user?.followerCount}
            </div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
          <div className="w-1/3 text-center">
            <div className="font-bold text-lg text-gray-800">
              {user?.postCount}
            </div>
            <div className="text-xs text-gray-400">Posts</div>
          </div>
          <div className="w-1/3 text-center">
            <div className="font-bold text-lg text-gray-800">
              {user?.followingCount}
            </div>
            <div className="text-xs text-gray-400">Following</div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            className="bg-indigo-600 py-2 px-16 mx-1 text-base rounded-lg text-white font-medium hover:bg-indigo-500 duration-300"
            type="button"
            onClick={() => handleFollow()}
          >
            {user?.isFollowing === true || isFollowing === true
              ? "Unfollow"
              : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
