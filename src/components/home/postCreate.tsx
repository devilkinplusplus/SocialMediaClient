import React, { useEffect } from "react";

function PostCreate() {
  useEffect(() => {});
  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-lg">
     
      {/* User info */}
      <div className="flex mb-4">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="sa"
          className="w-10 h-10 rounded-full mr-4 object-cover"
        />
        <div className="flex flex-col justify-start items-baseline">
          <span className="text-gray-700 text-xl">John Doe</span>
          <span className="text-gray-400 text-xs">@johndoe</span>
        </div>
      </div>
      <form method="POST">
        <div className="mb-4">
          <textarea
            id="postContent"
            name="postContent"
            rows={6}
            placeholder="What's your on mind?"
            className="appearance-none bg-gray-100 rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:bg-white"
          ></textarea>
        </div>
        <div className="mb-4 flex items-center">
          <div className="relative">
            <input
              type="file"
              id="fileInput"
              name="fileInput"
              className="w-0 h-0 opacity-0 absolute"
            />
            <label
              htmlFor="fileInput"
              className="bg-white text-gray-400 border-2 outline-none py-2 px-4 rounded cursor-pointer flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Upload File
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded duration-300"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCreate;
