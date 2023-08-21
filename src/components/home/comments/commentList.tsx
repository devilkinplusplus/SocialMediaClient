import React, { memo } from "react";
import CommentDetails from "./commentDetails";

function CommentList({ comments }) {
    return (
    <>
      {comments?.map((comment, index) => {
        return <CommentDetails key={index} comment={comment} />;
      })}
    </>
  );
}

export default memo(CommentList);
