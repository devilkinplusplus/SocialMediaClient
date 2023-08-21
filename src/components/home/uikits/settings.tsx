import React from "react";
import { confirmAlert } from "../../../common/services/alertifyService";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import ChangePassword from "./changePassword";

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    confirmAlert(
      "Question",
      "Are you sure to logout?",
      () => {
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      },
      () => {}
    );
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <div
              onClick={() => navigate("/account")}
              className="flex gap-x-4 justify-start items-center cursor-pointer hover:bg-gray-200 pl-4 w-128 py-2 rounded-lg"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-700">
                <i className="fas fa-house text-2xl text-white"></i>
              </div>
              <p className="text-con-black font-medium text-xl">
                Account Settings
              </p>
            </div>
            {/* Change password */}
            <div
              onClick={handleOpen}
              className="flex gap-x-4 justify-start items-center cursor-pointer hover:bg-gray-200 pl-4 w-128 py-2 rounded-lg"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-600">
                <i className="fas fa-key text-2xl text-white"></i>
              </div>
              <p className="text-con-black font-medium text-xl">
                Change Password
              </p>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="flex items-center justify-center"
            >
              <div className="bg-white p-8 pb-20 rounded-lg w-256">
                <ChangePassword close={handleClose} />
              </div>
            </Modal>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start px-6 my-4 gap-y-1">
          <p className="text-gray-300 text-sm font-medium">Other</p>
          <div className="flex flex-col gap-y-2">
            {/* Notifications */}
            <div className="flex gap-x-4 justify-start items-center cursor-pointer hover:bg-gray-200 pl-4 w-128 py-2 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-700">
                <i className="fas fa-bell text-2xl text-white"></i>
              </div>
              <p className="text-con-black font-medium text-xl">
                Notifications
              </p>
            </div>
            {/* Help */}
            <div onClick={() => navigate("/help")} className="flex gap-x-4 justify-start items-center cursor-pointer hover:bg-gray-200 pl-4 w-128 py-2 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-400">
                <i className="fas fa-question text-2xl text-white"></i>
              </div>
              <p className="text-con-black font-medium text-xl">Help</p>
            </div>
            {/* Signout */}
            <div
              onClick={() => handleLogout()}
              className="flex gap-x-4 justify-start items-center cursor-pointer hover:bg-gray-200 pl-4 w-128 py-2 rounded-lg"
            >
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
