import { Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Rank({ rank }) {
  const navigate = useNavigate();
  let iconClass = "";
  let iconName = "";

  switch (rank) {
    case "Rocket":
      iconClass = "bg-red-700";
      iconName = "fas fa-rocket";
      break;
    case "Global":
      iconClass = "bg-blue-700";
      iconName = "fas fa-globe";
      break;
    case "Star":
      iconClass = "bg-yellow-400";
      iconName = "fas fa-star";
      break;
    case "Robotto":
      iconClass = "bg-gray-700";
      iconName = "fas fa-robot";
      break;
    case "Ghost":
      iconClass = "bg-gray-400";
      iconName = "fas fa-ghost";
      break;
    case "Skull":
      iconClass = "bg-slate-800";
      iconName = "fas fa-skull";
      break;
    default:
      break;
  }

  return (
    <>
      <Tooltip title={`${rank}`}>
        <div
          className={`flex items-center justify-center h-14 w-14 rounded-full cursor-pointer ${iconClass}`}
          onClick={() => navigate("/ranks")}
        >
          <i className={`text-3xl text-white ${iconName}`}></i>
        </div>
      </Tooltip>
    </>
  );
}

export default Rank;
