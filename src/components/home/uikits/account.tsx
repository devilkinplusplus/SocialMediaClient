import React from "react";

function Account() {
  return (
    <div className="bg-white h-auto mx-10 my-5 pb-10 rounded-lg">
      <div className="bg-blue-600 h-20 rounded-t-lg flex justify-start items-center gap-x-2 text-white text-2xl">
        <p className="pl-6">
          <i className="fas fa-arrow-left"></i>
        </p>
        <p className="pl-2">Account Details</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-2">
        <img
          className="h-24 w-24 object-cover rounded-md mt-4"
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Profile Picture"
        />
        <p className="text-2xl text-gray-700 font-medium tracking-wider">
          John Doe
        </p>
      </div>
      <form
        className="flex flex-col justify-start items-center gap-y-2 text-gray-500"
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="firstName">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            autoComplete="off"
            value="John"
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md focus:bg-con-white focus:border-blue-600 duration-200"
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="lastName">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            autoComplete="off"
            value="Doe"
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md focus:bg-con-white focus:border-blue-600 duration-200"
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            value="johndoe@gmail.com"
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md focus:bg-con-white focus:border-blue-600 duration-200"
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            value="johndoe"
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md focus:bg-con-white focus:border-blue-600 duration-200"
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="about">
            About
          </label>
          <textarea
            id="about"
            autoComplete="off"
            rows={5}
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md
         focus:bg-con-white focus:border-blue-600 duration-200"
          >
            This is about section of John doe
          </textarea>
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            autoComplete="off"
            className="outline-none border-2 border-gray-100 w-80 md:w-128 bg-gray-100 py-3 px-4 rounded-md focus:bg-con-white focus:border-blue-600 duration-200"
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start">
          <label className="pl-0.5 font-medium" htmlFor="username">
            Select profile photo
          </label>
          <label
            htmlFor="file-upload"
            className="w-80 md:w-128 relative bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-sm py-3 px-4 cursor-pointer"
          >
            <span>Upload</span>
            <input
              id="file-upload"
              type="file"
              className="absolute inset-0 opacity-0 z-50"
            />
          </label>
        </div>
        <div className="flex flex-col gap-y-1 justify-start items-start pt-3">
          <button
            type="button"
            className="py-3 px-4 w-80 md:w-128 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Account;
