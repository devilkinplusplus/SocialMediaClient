import { Avatar } from "@mui/material";
import React from "react";
import { stringAvatar } from '../../../common/services/utilities/stringUtilities';

function Requests() {
  return (
    <>
      <h3 className="text-gray-300 text-sm pl-5 pt-2">Requests</h3>

      <div className="flex-col items-start justify-between">
        <div className="flex items-center gap-2 text-gray-400 text-lg py-2 my-2 pl-4  hover:bg-gray-200 rounded-lg duration-300">
           <Avatar {...stringAvatar(`John Doe`)}  />
          <div className="flex gap-x-3 items-center">
            <a href="#" className="font-medium">
              John Doe
            </a>
            <div className="text-2xl flex gap-x-1 items-baseline">
              <a>
                <i className="fa-solid fa-circle-check text-green-600 hover:bg-green-600 hover:text-white rounded-full"></i>
              </a>
              <a>
                <i className="fa-solid fa-circle-xmark text-red-600 hover:bg-red-600 hover:text-white rounded-full"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col items-start justify-between">
        <div className="flex items-center gap-2 text-gray-400 text-lg py-2 my-2 pl-4  hover:bg-gray-200 rounded-lg duration-300">
           <Avatar {...stringAvatar(`John Doe`)}  />
          <div className="flex gap-x-3 items-center">
            <a href="#" className="font-medium">
              John Doe
            </a>
            <div className="text-2xl flex gap-x-1 items-baseline">
              <a>
                <i className="fa-solid fa-circle-check text-green-600 hover:bg-green-600 hover:text-white rounded-full"></i>
              </a>
              <a>
                <i className="fa-solid fa-circle-xmark text-red-600 hover:bg-red-600 hover:text-white rounded-full"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col items-start justify-between">
        <div className="flex items-center gap-2 text-gray-400 text-lg py-2 my-2 pl-4  hover:bg-gray-200 rounded-lg duration-300">
           <Avatar {...stringAvatar(`John Doe`)}  />
          <div className="flex gap-x-3 items-center">
            <a href="#" className="font-medium">
              John Doe
            </a>
            <div className="text-2xl flex gap-x-1 items-baseline">
              <a>
                <i className="fa-solid fa-circle-check text-green-600 hover:bg-green-600 hover:text-white rounded-full"></i>
              </a>
              <a>
                <i className="fa-solid fa-circle-xmark text-red-600 hover:bg-red-600 hover:text-white rounded-full"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Requests;
