import React from "react";

function ResetPassword() {
  return (
    <>
      <div className="flex flex-col font-gemunu text-gray-600 justify-center items-center py-10 px-5 rounded-lg bg-con-white h-auto mx-5 my-10">
        <p className="text-2xl font-medium">New Password Request</p>

        <form className="flex flex-col gap-y-1 items-start justify-between font-medium">
          <span className="pl-1">New Password</span>
          <input
            type="password"
            placeholder="New Password.."
            className="py-2 px-3 w-80 md:w-128 outline-none rounded-md focus:bg-gray-100 duration-200 border-2 border-white focus:border-blue-500"
          />
          <span className="pl-1">Confirm Password</span>
          <input
            type="password"
            placeholder="Repeat Password.."
            className="py-2 px-3 w-80 md:w-128 outline-none rounded-md focus:bg-gray-100 duration-200 border-2 border-white focus:border-blue-500"
          />
          <button
            type="button"
            className="py-2 px-4 mt-2 w-full bg-green-400 text-white rounded-md hover:bg-green-500"
          >
            Confirm
          </button>
        </form>
      </div>
      {/* <div className="flex justify-center items-center bg-red-100 h-20 text-center space-x-3">
        <span className="text-xl font-medium text-red-600">
          This link is unavailable.
        </span>
        <button
          type="button"
          className="py-1 px-3 bg-red-500 border border-white rounded-lg font-medium text-white hover:bg-white hover:text-red-500 duration-200"
        >
          Go Back
        </button>
      </div> */}
    </>
  );
}

export default ResetPassword;
