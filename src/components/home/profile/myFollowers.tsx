import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { stringAvatar } from "../../../common/services/utilities/stringUtilities";
import { Following } from "../../../common/constants/dtos/following";
import { getFollowers } from "../../../common/services/models/followService";
import { AxiosResponse } from "axios";
import { FollowerResponse } from "../../../common/constants/responseParams/followerResponse";
import Follower from "./follower";
import ReactPaginate from "react-paginate";
import { useRecoilState } from "recoil";
import { followerState, followingState } from "../../../common/services/states/userState";

function MyFollowers() {
  const { userId } = useParams();
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followers, setFollowers] = useRecoilState<Following[]>(followerState)
  const [followings, setFollowings] = useRecoilState<Following[]>(followingState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true)
    getFollowers(userId, page, size)
      .then((res: AxiosResponse<FollowerResponse>) => {
        if (res.data.succeeded) {
          setFollowers(res.data.value.followings);
          setFollowerCount(res.data.value.followingCount);
        }
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setOpen(false)
      });
  }, []);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected);
  };

  return (
    <div className="flex flex-col justify-start items-start gap-y-2 px-8 py-4 bg-white h-80 m-4">
      <div className="flex justify-start items-baseline space-x-4">
        <h3 className="text-2xl text-gray-400 tracking-wider">Followers</h3>
        <span className="rounded-full bg-purple-800 text-white text-center px-2">
          {followerCount}
        </span>
      </div>
      {/* Seperate it component */}

      {followers?.length > 0 ? (
        followers.map((follower, index) => {
          return <Follower key={index} follower={follower} setFollowers = {setFollowers} setFollowings={setFollowings} />;
        })
      ) : (
        <div className="bg-gray-200 w-full flex justify-center items-center text-gray-400 h-36 text-2xl">
          You have no followers
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageChange}
        containerClassName="flex justify-center space-x-3 border py-2 px-4 text-gray-500"
        pageCount={Math.ceil(followerCount / size)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel="previous"
        renderOnZeroPageCount={null}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default MyFollowers;
