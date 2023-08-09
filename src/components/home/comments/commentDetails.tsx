import React, { useEffect } from "react";

function CommentDetails({ comment }) {

  return (
    <div className="flex flex-col flex-wrap w-full space-y-4 bg-gray-50 py-4 rounded-lg shadow-lg px-4">
      <div className="flex items-center space-x-4">
        {comment.user?.profileImage ? (
          <img
            src={`https://localhost:7134/${comment.user?.profileImage?.path}`}
            alt="pp"
            className="w-10 h-10 rounded-full mr-4 object-cover"
          />
        ) : (
          <div className="rounded-full border-2 border-purple-800 h-10 w-10 pt-1.5 pl-3 mt-1 mr-2">
            <i className="fas fa-user text-lg  text-purple-800"></i>
          </div>
        )}
        <div className="ml-2 space-x-3">
          <span className="text-con-black text-lg">
            {comment?.user?.firstName} {comment?.user?.lastName}
          </span>
        </div>
      </div>
      <p className="text-lg text-gray-800">{comment?.content}</p>
    </div>
  );
}

export default CommentDetails;
