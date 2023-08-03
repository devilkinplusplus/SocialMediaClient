import React from "react";

function ForgotPassword() {
  return (
    <div className="flex flex-col font-gemunu text-gray-600 justify-center items-center py-10 px-5 rounded-lg bg-con-white h-auto mx-5 my-10">
      <p className="text-2xl font-medium">Email confirmation</p>
      <form className="flex items-center">
        <input
          type="email"
          placeholder="Email address.."
          className="py-2 px-3 w-80 md:w-128 outline-none rounded-l-md focus:bg-gray-100 duration-200 border-2 border-white focus:border-blue-500"
        />
        <button
          type="button"
          className="py-2 px-4 bg-gray-400 text-white rounded-r-md hover:bg-gray-500"
        >
          Send
        </button>
      </form>
      <span className="pt-4 text-gray-400">
        We will send a link to your email, from which you can change your
        password
      </span>
    </div>
  );
}

export default ForgotPassword;