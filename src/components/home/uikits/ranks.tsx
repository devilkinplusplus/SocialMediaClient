import React from "react";

function Ranks() {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-4 mx-4">
        <p className="text-4xl font-medium text-gray-500 tracking-wider">
          Ranks
        </p>
        <p className="text-sm text-gray-400 text-center">
          If you achieve these ranks, they will be displayed on your profile
        </p>
      </div>

      <div className="flex flex-wrap justify-evenly items-center mx-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 my-2">
          <div className="flex justify-center items-center m-4">
            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-red-700">
              <i className="fas fa-rocket text-5xl text-white"></i>
            </div>
          </div>
          <div className="px-8 py-4">
            <div className="flex flex-col justify-center items-center font-medium text-gray-800">
              <p className="text-2xl">Rocket</p>
              <div className="text-sm text-gray-400 mb-1 text-center">
                To get this rank, your minimum interactions should be as follows
              </div>
            </div>

            <div className="flex justify-evenly mt-5">
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">10</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">5</div>
                <div className="text-xs text-gray-400">Followings</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">5</div>
                <div className="text-xs text-gray-400">Posts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 my-2">
          <div className="flex justify-center items-center m-4">
            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-blue-700">
              <i className="fas fa-globe text-5xl text-white"></i>
            </div>
          </div>

          <div className="px-8 py-4">
            <div className="flex flex-col justify-center items-center font-medium text-gray-800">
              <p className="text-2xl">Global</p>
              <div className="text-sm text-gray-400 mb-1 text-center">
                To get this rank, your minimum interactions should be as follows
              </div>
            </div>

            <div className="flex justify-evenly mt-5">
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">20</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">15</div>
                <div className="text-xs text-gray-400">Followings</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">15</div>
                <div className="text-xs text-gray-400">Posts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 my-2">
          <div className="flex justify-center items-center m-4">
            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-yellow-400">
              <i className="fas fa-star text-5xl text-white"></i>
            </div>
          </div>

          <div className="px-8 py-4">
            <div className="flex flex-col justify-center items-center font-medium text-gray-800">
              <p className="text-2xl">Star</p>
              <div className="text-sm text-gray-400 mb-1 text-center">
                To get this rank, your minimum interactions should be as follows
              </div>
            </div>

            <div className="flex justify-evenly mt-5">
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">30</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">30</div>
                <div className="text-xs text-gray-400">Followings</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">30</div>
                <div className="text-xs text-gray-400">Likes</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 my-2">
          <div className="flex justify-center items-center m-4">
            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-700">
              <i className="fas fa-robot text-5xl text-white"></i>
            </div>
          </div>

          <div className="px-8 py-4">
            <div className="flex flex-col justify-center items-center font-medium text-gray-800">
              <p className="text-2xl">Robotto</p>
              <div className="text-sm text-gray-400 mb-1 text-center">
                To get this rank, your minimum interactions should be as follows
              </div>
            </div>

            <div className="flex justify-evenly mt-5">
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">50</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">40</div>
                <div className="text-xs text-gray-400">Likes</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">15</div>
                <div className="text-xs text-gray-400">Posts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 my-2">
          <div className="flex justify-center items-center m-4">
            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-400">
              <i className="fas fa-ghost text-5xl text-white"></i>
            </div>
          </div>

          <div className="px-8 py-4">
            <div className="flex flex-col justify-center items-center font-medium text-gray-800">
              <p className="text-2xl">Ghost</p>
              <div className="text-sm text-gray-400 mb-1 text-center">
                To get this rank, your minimum interactions should be as follows
              </div>
            </div>

            <div className="flex justify-evenly mt-5">
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">50</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">10</div>
                <div className="text-xs text-gray-400">Followings</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">0</div>
                <div className="text-xs text-gray-400">Post</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 my-2">
          <div className="flex justify-center items-center m-4">
            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-slate-800">
              <i className="fas fa-skull text-5xl text-white"></i>
            </div>
          </div>

          <div className="px-8 py-4">
            <div className="flex flex-col justify-center items-center font-medium text-gray-800">
              <p className="text-2xl">Skull</p>
              <div className="text-sm text-gray-400 mb-1 text-center">
                To get this rank, your minimum interactions should be as follows
              </div>
            </div>

            <div className="flex justify-evenly mt-5">
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">100</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">50</div>
                <div className="text-xs text-gray-400">Followings</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="font-bold text-lg text-gray-800">70</div>
                <div className="text-xs text-gray-400">Likes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ranks;
