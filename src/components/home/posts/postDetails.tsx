import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { timeFormat } from "../../../common/services/utilities/timeFormat";
import { toggleLikePost } from "../../../common/services/models/postService";
import { useRecoilState } from "recoil";
import { User } from "../../../common/constants/dtos/user";
import { userState } from "../../../common/services/states/userState";
import { Post } from "../../../common/constants/dtos/post";
import { postState } from "../../../common/services/states/postState";
import Slider from "react-slick";

function PostDetails({ post }) {
  const user = useRecoilState<User>(userState);
  const [posts, setPosts] = useRecoilState<Post[] | any>(postState);

  const handleLike = async (postId: string) => {
    try {
      const res = await toggleLikePost(postId, user[0].id);
      if (res.data.succeeded) {
        setPosts((prevPosts) =>
          prevPosts.map((val) =>
            val.id === postId
              ? {
                  ...val,
                  isLiked: !val.isLiked,
                  likes: val.isLiked ? val.likes - 1 : val.likes + 1,
                }
              : val
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col flex-wrap w-full space-y-4 bg-gray-50 py-4 rounded-lg shadow-lg  px-4">
      <div className="flex items-center space-x-4">
        {post.user.profileImage ? (
          <img
            className="h-10 w-10 rounded-full"
            alt="Profile picture"
            src={`https://localhost:7134/${post.user.profileImage}`}
          />
        ) : (
          <div className="rounded-full border-2 border-purple-800 w-10 h-10 pt-2 pl-3 mt-1 mr-2">
            <i className="fas fa-user text-lg  text-purple-800"></i>
          </div>
        )}
        <div className="ml-2 space-x-3">
          <span className="text-con-black text-lg">
            {post.user.firstName} {post.user.lastName}
          </span>
          <span className="text-gray-400 text-sm">
            {timeFormat(post.date).includes("-")
              ? "Just now"
              : timeFormat(post.date)}
          </span>
        </div>
      </div>
      <p className="text-lg text-gray-800">{post.content}</p>
      {post.files.length > 0 && (
        <div className="relative rounded-lg shadow-lg max-w-lg">
          <Slider
            className="overflow-hidden"
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={2000}
            cssEase={"linear"}
            pauseOnHover = {true}
          >
            {post.files.map((file, index) => (
              <img
                key={index}
                src={`https://localhost:7134/${file}`}
                alt={`Post image ${index}`}
                className="w-full h-auto"
              />
            ))}
          </Slider>
        </div>
      )}

      <div className="flex items-center space-x-4 text-gray-600">
        <button
          onClick={() => handleLike(post.id)}
          className="flex items-center space-x-1 focus:outline-none thumbs-up"
          type="button"
        >
          <i
            className={`fas fa-thumbs-up ${post.isLiked && "text-blue-600"}`}
          ></i>
          <span
            className={`${post.isLiked ? "text-blue-600" : "text-gray-600"}`}
          >
            {post.likes} likes
          </span>
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
