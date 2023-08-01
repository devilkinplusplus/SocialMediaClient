import React from "react";
import { Outlet } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";
function AuthLayout() {
  return (
    <div className="flex flex-col justify-center">
        <div className="flex justify-start items-baseline p-4">
            <Link to="/" className="text-xl border-2 border-purple-600 py-1 px-6 rounded-md text-purple-600 hover:bg-purple-600 hover:text-white duration-300">
                <ArrowBackIosIcon className="pb-1 text-xl" /> Go Back
            </Link>
        </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
