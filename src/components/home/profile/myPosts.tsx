import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../common/constants/dtos/user";
import { AxiosResponse } from "axios";
import { Post } from "../../../common/constants/dtos/post";
import { getMyPosts } from "../../../common/services/models/postService";
import { PostListResponse } from "../../../common/constants/responseParams/postListResponse";
import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import PostDetails from "../posts/postDetails";
import ReactPaginate from "react-paginate";

function MyPosts() {
  const { userId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [postCount, setPostCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

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
    <>
      {loading ? (
        <Stack spacing={1} width={"544px"}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      ) : (
        posts.map((post, index) => {
          return <PostDetails post={post} key={index} setPosts={setPosts}/>;
        })
      )}
      <hr />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageChange}
        containerClassName="flex justify-start space-x-5 border py-2 px-4 text-gray-500"
        pageCount={Math.ceil(postCount / size)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel="previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default MyPosts;
