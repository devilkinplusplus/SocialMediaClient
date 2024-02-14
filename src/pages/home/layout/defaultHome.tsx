import React from "react";
import PostCreate from "../../../components/home/posts/postCreate";
import PostList from "../../../components/home/posts/postList";
import RightSidebar from "../../../components/home/layout/rightSidebar";
function DefaultHome() {
  return (
    <div className="flex justify-between w-full">
      <div className="flex-grow flex-col space-y-4 justify-center items-center">
        <PostCreate />
        <PostList />
      </div>
      <div className="flex-none w-1/4 hidden sm:flex">
        <RightSidebar />
      </div>
    </div>
  );
}

export default DefaultHome;
