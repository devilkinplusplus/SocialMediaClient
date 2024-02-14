import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../common/services/utilities/stringUtilities";
import { getUserIdFromToken } from "../../../common/services/utilities/jwtUtils";
import { followUser } from "../../../common/services/models/followService";
import { AxiosResponse } from "axios";
import { FollowResponse } from "../../../common/constants/responseParams/followResponse";

function Follower({ follower, setFollowers, setFollowings }) {
  const authId = getUserIdFromToken();
  const [requested, setRequested] = useState<boolean>(false);
  const [isFollowing,setIsFollowing] = useState<boolean>(false)

  const followUserAsync = async () => {
    await followUser(authId, follower.id)
      .then((res: AxiosResponse<FollowResponse>) => {
        console.log(res.data);
        if (res.data.succeeded) {
          if (res.data.followState.isUnfollowed === true) {
            setFollowings((prev) =>
              prev.filter(
                (following) =>
                  following.id !== res.data.followState.following.id
              )
            );
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-between items-center gap-x-1 py-2 bg-gray-100 w-256 h-16 rounded-md hover:bg-gray-50 duration-300 cursor-pointer">
      <div className="flex items-center">
        <div className="flex">
          {follower?.profileImage ? (
            <img
              src={`https://localhost:7134/${follower?.profileImage}`}
              alt="sa"
              className="w-10 h-10 rounded-full ml-4 object-cover"
            />
          ) : (
            <Avatar
              {...stringAvatar(`${follower?.firstName} ${follower?.lastName}`)}
              className="ml-4"
            />
          )}

          <div className="flex flex-col justify-center items-baseline pl-3">
            <h3 className="text-lg text-gray-500">
              {follower?.firstName} {follower?.lastName}
            </h3>
            <span className="text-xs text-gray-300">@{follower?.userName}</span>
          </div>
        </div>
      </div>

      {follower.doIFollow ? (
        <button
          className="w-24 py-1 bg-purple-500 hover:bg-purple-400 duration-300 text-white rounded ml-auto mr-2"
          type="button"
          onClick={() => followUserAsync()}
        >
          Unfollow
        </button>
      ) : requested === true ? (
        <button
          className="w-24 py-1 bg-gray-300 text-gray-600 rounded ml-auto mr-2 cursor-not-allowed"
          type="button"
          // You can optionally show a tooltip or message for this case
          title="Request sent"
          disabled
        >
          Requested
        </button>
      ) : authId === follower.id ? (
        <p></p>
      ) : (
        <button
          className="w-24 py-1 bg-purple-500 hover:bg-purple-400 duration-300 text-white rounded ml-auto mr-2"
          type="button"
          onClick={() => followUserAsync()}
        >
          {isFollowing === true  ? "Following" : "Follow"}
        </button>
      ) }
    </div>
  );
}

export default Follower;
