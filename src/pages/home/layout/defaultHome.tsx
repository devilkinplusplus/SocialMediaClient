import React from "react";
import PostCreate from "../../../components/home/posts/postCreate";
import PostList from "../../../components/home/posts/postList";
import RightSidebar from "../../../components/home/layout/rightSidebar";
function DefaultHome() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-grow flex-col p-5 space-y-4 justify-start items-center">
        <PostCreate />
        <PostList />
      </div>
      <div className="flex-none w-1/4">
        <RightSidebar />
      </div>
    </div>
  );
}

export default DefaultHome;
