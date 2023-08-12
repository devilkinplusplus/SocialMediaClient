import { Alert } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function MyRanks() {
  return (
    <div className="flex flex-col justify-between items-center">
      <Alert severity="info" className="w-full" variant="outlined">
        You have no ranks yet - 
        <strong>
          <Link to="/ranks"> Check out how to get ranks</Link>
        </strong>
      </Alert>
    </div>
  );
}

export default MyRanks;
