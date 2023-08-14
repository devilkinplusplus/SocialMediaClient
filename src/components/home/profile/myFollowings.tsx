import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFollowings } from "../../../common/services/models/followService";
import { AxiosResponse } from "axios";
import { FollowerResponse } from "../../../common/constants/responseParams/followerResponse";
import Follower from "./follower";
import ReactPaginate from "react-paginate";
import { Backdrop, CircularProgress } from "@mui/material";
import { followerState, followingState } from "../../../common/services/states/userState";
import { useRecoilState } from "recoil";
import { Following } from "../../../common/constants/dtos/following";

function MyFollowings() {
  const { userId } = useParams();
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followings, setFollowings] = useRecoilState<Following[]>(followingState);
  const [followers, setFollowers] = useRecoilState<Following[]>(followerState);

  const [open, setOpen] = useState(false);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected);
  };

  useEffect(() => {
    setOpen(true);
    getFollowings(userId, page, size)
      .then((res: AxiosResponse<FollowerResponse>) => {
        if (res.data.succeeded) {
          setFollowings(res.data.value.followings);
          setFollowingCount(res.data.value.followingCount);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpen(false);
      });
  }, []);

  return (
    <div className="flex flex-col justify-start items-start gap-y-2 px-8 py-4 bg-white h-80 m-4">
      <div className="flex justify-start items-baseline space-x-4">
        <h3 className="text-2xl text-gray-400 tracking-wider">Followings</h3>
        <span className="rounded-full bg-purple-800 text-white text-center px-2">
          {followingCount}
        </span>
      </div>

      {followings?.length > 0 ? (
        followings?.map((follower, index) => {
          return (
            <Follower
              key={index}
              follower={follower}
              setFollowers={setFollowers}
              setFollowings={setFollowings}
            />
          );
        })
      ) : (
        <div className="bg-gray-200 w-full flex justify-center items-center text-gray-400 h-36 text-2xl">
          You have no followings
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageChange}
        containerClassName="flex justify-center space-x-3 border py-2 px-4 text-gray-500"
        pageCount={Math.ceil(followingCount / size)}
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

export default MyFollowings;
