import React from 'react';

const UserCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-56 my-2">
      {/* Profile Image */}
      <div className="flex justify-center items-center m-4">
        <img
          className="h-24 w-24 object-cover rounded-full"
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Profile Picture"
        />
      </div>
      <div className="px-8 py-4">
        {/* Username */}
        <div className="flex flex-col justify-center items-center font-medium text-gray-800">
          <p className="text-2xl">John Doe</p>
          <div className="text-sm text-gray-400 mb-1">@username</div>
          <div className="text-gray-400">Little about the user.</div>
        </div>

        {/* Extras */}
        <div className="flex justify-evenly mt-5">
          <div className="w-1/3 text-center">
            <div className="font-bold text-lg text-gray-800">100</div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
          <div className="w-1/3 text-center">
            <div className="font-bold text-lg text-gray-800">50</div>
            <div className="text-xs text-gray-400">Following</div>
          </div>
          <div className="w-1/3 text-center">
            <div className="font-bold text-lg text-gray-800">20</div>
            <div className="text-xs text-gray-400">Posts</div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center items-center mt-3">
          <button
            className="bg-indigo-600 py-2 px-20 text-base rounded-lg text-white font-medium hover:bg-indigo-500 duration-300"
            type="button"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
