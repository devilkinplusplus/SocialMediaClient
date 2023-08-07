import React from "react";
import { timeFormat }  from "../../../common/services/utilities/timeFormat";

function PostDetails({ post }) {
  return (
    <div className="flex flex-col flex-wrap w-full space-y-4 bg-gray-50 py-4 rounded-lg shadow-lg  px-4">
      <div className="flex items-center space-x-4">
        <img
          className="h-10 w-10 rounded-full"
          alt="Profile picture"
          src={`https://localhost:7134/${post.user.profileImage}`}
        />
        <div className="ml-2 space-x-3">
          <span className="text-con-black text-lg">
            {post.user.firstName} {post.user.lastName}
          </span>
          <span className="text-gray-400 text-sm">{timeFormat(post.date).includes("-") ? "Just now" : timeFormat(post.date) }</span>
        </div>
      </div>
      <p className="text-lg text-gray-800">{post.content}</p>
      {post.files.length > 0 && (
        <img
          src={`https://localhost:7134/${post.files[0]}`}
          alt="Post image"
          className="rounded-lg shadow-lg max-w-lg h-auto"
        />
      )}

      <div className="flex items-center space-x-4 text-gray-600">
        <button
          className="flex items-center space-x-1 focus:outline-none thumbs-up"
          type="button"
        >
          <i className="fas fa-thumbs-up"></i>
          <span>{post.likes} likes</span>
        </button>
        <button
          className="flex items-center space-x-1 focus:outline-none comment"
          id="com_1"
        >
          <i className="fas fa-comment"></i>
          <span>0</span>
        </button>
        <button className="flex items-center space-x-1 focus:outline-none">
          <i className="fas fa-share-nodes"></i>
        </button>
      </div>
    </div>
  );
}

export default PostDetails;
