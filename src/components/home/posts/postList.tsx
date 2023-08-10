import React, { useCallback, useEffect, useState } from "react";
import { listPosts } from "../../../common/services/models/postService";
import { useRecoilState } from "recoil";
import { userState } from "../../../common/services/states/userState";
import { postState } from "../../../common/services/states/postState";
import { PostListResponse } from "../../../common/constants/responseParams/postListResponse";
import { Post } from "../../../common/constants/dtos/post";
import PostDetails from "./postDetails";
import ReactPaginate from "react-paginate";
import { AxiosResponse } from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function PostList() {
  const [user, setUser] = useRecoilState(userState);
  const [posts, setPosts] = useRecoilState<Post[] | any>(postState);
  const [postCount, setPostCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(() => {
    if (user) {
      setLoading(true);
      listPosts(page, size, user.id)
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
  }, [user, page, size]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected);
  };

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
          return <PostDetails post={post} key={index} />;
        })
      )}
      <hr />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageChange}
        containerClassName="flex justify-evenly space-x-4 border py-2 px-4 text-gray-500"
        pageCount={Math.ceil(postCount / size)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel="previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PostList;
