import React from "react";

function Settings() {
  return (
    <>
      <div className="flex justify-center items-center my-4 mx-4">
        <p className="text-4xl font-medium text-gray-500 tracking-wider">
          Settings
        </p>
      </div>

      <div className="bg-con-white py-4 mx-4 rounded-lg h-auto">
        <div className="flex flex-col justify-start items-start px-6 gap-y-1">
          <p className="text-gray-300 text-sm font-medium">General</p>
          <div className="flex flex-col gap-y-2">
            {/* Account */}
            <div className="flex gap-x-4 justify-start items-baseline cursor-pointer hover:bg-gray-200 pl-4 pr-40 pt-2 pb-1 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-700">
                <i className="fas fa-house text-2xl text-white"></i>
              </div>
              <p className="text-con-black font-medium text-xl">Account</p>
            </div>
            {/* Change password */}
            <div className="flex gap-x-4 justify-start items-baseline cursor-pointer hover:bg-gray-200 pl-4 pr-40 pt-2 pb-1 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-600">
                <i className="fas fa-key text-2xl text-white"></i>
              </div>
              <p className="text-con-black font-medium text-xl">Change</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start px-6 my-4 gap-y-1">
          <p className="text-gray-300 text-sm font-medium">Other</p>
          <div className="flex flex-col gap-y-2">
            {/* Notifications */}
            <div className="flex gap-x-4 justify-start items-baseline cursor-pointer hover:bg-gray-200 pl-4 pr-60 pt-2 pb-1 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-700">
                <i className="fas fa-bell text-2xl text-white"></i>
              </div>
              <p className="text-con-black font-medium text-xl">
                Notifications
              </p>
            </div>
            {/* Help */}
            <div className="flex gap-x-4 justify-start items-baseline cursor-pointer hover:bg-gray-200 pl-4 pr-40 pt-2 pb-1 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-400">
                <i className="fas fa-question text-2xl text-white"></i>
              </div>
              <p className="text-con-black font-medium text-xl">Help</p>
            </div>
            {/* Signout */}
            <div className="flex gap-x-4 justify-start items-baseline cursor-pointer hover:bg-gray-200 pl-4 pr-40 pt-2 pb-1 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-600">
                <i className="fas fa-right-from-bracket text-2xl text-white"></i>
              </div>
              <p className="text-con-black font-medium text-xl">Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
