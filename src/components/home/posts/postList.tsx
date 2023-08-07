import React, { useCallback, useEffect,useState } from "react";
import { listPosts } from "../../../common/services/models/postService";
import { useRecoilState } from "recoil";
import { userState } from "../../../common/services/states/userState";
import { postState } from "../../../common/services/states/postState";
import { AxiosResponse } from "axios";
import { PostListResponse } from "../../../common/constants/responseParams/postListResponse";
import { Post } from "../../../common/constants/dtos/post";
import PostDetails from "./postDetails";

function PostList() {
  const [user, setUser] = useRecoilState(userState);
  const [posts,setPosts] = useRecoilState<Post[]>(postState);

  const fetchPosts = useCallback(() => {
    if (user) {
      listPosts(0, 5, user.id)
        .then((res) => {
          if (res.data.succeeded) {
            setPosts(res.data.values);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts]);


  return (
    <>
      {posts.map((post,index)=>{
        return <PostDetails post={post} key={index}/>
      })}
    </>
  );
}

export default PostList;
