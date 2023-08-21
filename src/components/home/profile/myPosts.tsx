import React, { useCallback, useEffect, useState,memo } from "react";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Post } from "../../../common/constants/dtos/post";
import { getMyPosts } from "../../../common/services/models/postService";
import { PostListResponse } from "../../../common/constants/responseParams/postListResponse";
import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import PostDetails from "../posts/postDetails";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function MyPosts() {
  const { userId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [postCount, setPostCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected);
  };

  const fetchPosts = useCallback(() => {
    if (userId) {
      setLoading(true);
      getMyPosts(page, size, userId)
        .then((res: AxiosResponse<PostListResponse>) => {
          if (res.data.succeeded) {
            setPosts(res.data.values);
            setPostCount(res.data.postCount);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId, page, size]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="m-4 px-8 py-4 space-y-2">
      <div className="flex justify-start items-baseline space-x-4">
        <div className="flex justify-start items-center space-x-3">
          <h3 className="text-2xl text-gray-400 tracking-wider">Posts</h3>
          <span className="rounded-full bg-purple-800 text-white text-center px-2">
            {postCount}
          </span>
        </div>
        <div
          className="flex justify-start items-center space-x-3 cursor-pointer"
          onClick={() => navigate(`/profile/followers/${userId}`)}
        >
          <h3 className="text-2xl text-gray-400 tracking-wider">
            {" "}
            / Followers
          </h3>
        </div>
        <div
          className="flex justify-start items-center space-x-3 cursor-pointer"
          onClick={() => navigate(`/profile/followings/${userId}`)}
        >
          <h3 className="text-2xl text-gray-400 tracking-wider">
            {" "}
            / Followings
          </h3>
        </div>
      </div>
      {loading ? (
        <Stack spacing={1} width={"544px"}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      ) : posts.length > 0 ? (
        posts.map((post, index) => {
          return <PostDetails post={post} key={index} setPosts={setPosts} />;
        })
      ) : (
        <div className="bg-gray-200 w-full flex justify-center items-center text-gray-400 h-36 text-2xl">
          No posts yet 🫤
        </div>
      )}
      <hr />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageChange}
        containerClassName="flex justify-start space-x-5 border rounded py-2 px-4 text-gray-500"
        pageCount={Math.ceil(postCount / size)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel="previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default memo(MyPosts);
