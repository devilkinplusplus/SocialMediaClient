import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
 
    const navigate = useNavigate();

    return (
    <div className="flex flex-col justify-center items-center p-28">
      <h2 className="text-9xl font-bold text-purple-800 tracking-widest">
        404
      </h2>
      <span className="tracking-wider text-2xl text-purple-300">
        Page is not found!
      </span>
      <button
      onClick={() => navigate("/")}
        className="mt-4 px-10 py-2 border-2 border-purple-400 rounded-lg text-purple-400 hover:bg-purple-400 hover:text-white duration-300"
        type="button"
      >
        Go Back
      </button>
    </div>
  );
}

export default NotFound;
