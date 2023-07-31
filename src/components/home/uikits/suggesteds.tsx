import React from 'react'

function Suggesteds() {
  return (
    <div>
      <h3 className="text-gray-300 text-sm pl-5 pt-2">Suggesteds</h3>

      <div className="flex-col items-start justify-between">
        <div className="flex items-center gap-2 text-gray-400 text-lg py-2 my-2 pl-4 hover:bg-gray-200 rounded-lg duration-300">
          <img
            className="h-10 w-10 rounded-full"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile picture"
          />
          <div className="flex gap-x-3 items-center">
            <a href="#">John Doe</a>
            <div className="text-md flex gap-x-1 items-baseline">
              <button
                type="button"
                className="px-2 text-purple-600 rounded-md bg-purple-300 text-con-white hover:bg-purple-200 duration-300"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col items-start justify-between">
        <div className="flex items-center gap-2 text-gray-400 text-lg py-2 my-2 pl-4 hover:bg-gray-200 rounded-lg duration-300">
          <img
            className="h-10 w-10 rounded-full"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile picture"
          />
          <div className="flex gap-x-3 items-center">
            <a href="#">John Doe</a>
            <div className="text-md flex gap-x-1 items-baseline">
              <button
                type="button"
                className="px-2 text-purple-600 rounded-md bg-purple-300 text-con-white hover:bg-purple-200 duration-300"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col items-start justify-between">
        <div className="flex items-center gap-2 text-gray-400 text-lg py-2 my-2 pl-4 hover:bg-gray-200 rounded-lg duration-300">
          <img
            className="h-10 w-10 rounded-full"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile picture"
          />
          <div className="flex gap-x-3 items-center">
            <a href="#">John Doe</a>
            <div className="text-md flex gap-x-1 items-baseline">
              <button
                type="button"
                className="px-2 text-purple-600 rounded-md bg-purple-300 text-con-white hover:bg-purple-200 duration-300"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Suggesteds