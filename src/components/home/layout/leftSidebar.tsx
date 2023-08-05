import React,{ memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "../../../common/services/alertifyService";

function LeftSidebar() {
  const navigate = useNavigate();

  const handleLogout = useCallback( () => {
    confirmAlert("Question","Are you sure to logout?",()=>{
      localStorage.removeItem("accessToken")
      navigate("/auth/login")
    },()=>{})    
  },[navigate])


  return (
    <div className="bg-gray-100 h-full">
      {/* Badges section */}
      <div className="hidden md:block container bg-con-white h-60 w-60 pt-3 space-y-1 rounded-xl">
        <h3 className="text-gray-300 text-sm pl-5 py-2">Badges</h3>

        <div className="flex-col items-start justify-between pl-5">
          <div className="flex items-baseline gap-3 text-gray-400 text-lg pb-2">
            <div className="bg-orange-200 rounded-full h-10 w-10 flex items-center justify-center">
              <i className="fas fa-tv text-orange-500"></i>
            </div>
            <Link to="/news" className="hover:text-orange-500 duration-300">
              News
            </Link>
          </div>
        </div>
        <div className="flex-col items-start justify-between pl-5">
          <div className="flex items-baseline gap-3 text-gray-400 text-lg pb-2">
            <div className="bg-red-200 rounded-full h-10 w-10 flex items-center justify-center">
              <i className="fas fa-bolt text-red-500"></i>
            </div>
            <Link to="/explore" className="hover:text-red-500 duration-300">
              Explore
            </Link>
          </div>
        </div>
        <div className="flex-col items-start justify-between pl-5">
          <div className="flex items-baseline gap-3 text-gray-400 text-lg pb-2">
            <div className="bg-green-200 rounded-full h-10 w-10 flex items-center justify-center">
              <i className="fas fa-ranking-star text-green-500"></i>
            </div>
            <Link to="/ranks" className="hover:text-green-500 duration-300">
              Ranks
            </Link>
          </div>
        </div>
      </div>
      {/* Settings section */}
      <div className="hidden md:block container bg-con-white h-60 w-60 pt-3 rounded-xl">
        <h3 className="text-gray-300 text-sm pl-5 pt-2">Settings</h3>

        <div className="flex-col items-start justify-between">
          <div onClick={() => navigate("/settings")} className="flex items-baseline gap-3 text-purple-400 text-lg pl-5 py-2 rounded-lg hover:bg-gray-200 cursor-pointer duration-300">
            <div className="bg-purple-300 rounded-full h-10 w-10 flex items-center justify-center">
              <i className="fas fa-cog text-purple-600"></i>
            </div>
            <Link to='/settings'>Setings</Link>
          </div>

          <div onClick={() => navigate("/account")} className="flex items-baseline gap-3 text-purple-400 text-lg pl-5 py-2 rounded-lg hover:bg-gray-200 cursor-pointer duration-300">
            <div className="bg-purple-300 rounded-full h-10 w-10 flex items-center justify-center">
              <i className="fas fa-user text-purple-600"></i>
            </div>
            <Link to='/account'>Account</Link>
          </div>

          <div onClick={() => handleLogout()} className="flex items-baseline gap-3 text-purple-400 text-lg pl-5 py-2 rounded-lg hover:bg-gray-200 cursor-pointer duration-300">
            <div className="bg-purple-300 rounded-full h-10 w-10 flex items-center justify-center">
              <i className="fas fa-right-from-bracket text-purple-600"></i>
            </div>
            <a>Sign out</a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LeftSidebar
