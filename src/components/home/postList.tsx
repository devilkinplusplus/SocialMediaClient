import React from "react";

function PostList() {
  return (
    <>
      <div className="flex flex-col flex-wrap space-y-4 bg-gray-50 py-4 rounded-lg shadow-lg  px-4">
        <div className="flex items-center space-x-4">
          <img
            className="h-10 w-10 rounded-full"
            alt="Profile picture"
            src="https://randomuser.me/api/portraits/men/1.jpg"
          />
          <div className="ml-2 space-x-3">
            <span className="text-con-black text-lg">John Doe</span>
            <span className="text-gray-400 text-sm">2 hours ago</span>
          </div>
        </div>
        <p className="text-lg text-gray-800">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. In nam
          suscipit eligendi. Blanditiis porro quisquam nemo quod reiciendis eos
          dolor voluptatum illum quam? Quisquam, id?
        </p>
        {/* <img
          src="sa"
          alt="Post image"
          className="rounded-lg shadow-lg max-w-lg h-auto"
        /> */}
        <div className="flex items-center space-x-4 text-gray-600">
          <button
            className="flex items-center space-x-1 focus:outline-none thumbs-up"
            type="button"
          >
            <i className="fas fa-thumbs-up"></i>
            <span>3 likes</span>
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
    </>
  );
}

export default PostList;
