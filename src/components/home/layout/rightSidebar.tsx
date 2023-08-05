import React from "react";
import Requests from "../uikits/followRequests";
import Suggesteds from "../uikits/suggesteds";

function RightSidebar() {
  return (
    <div className="h-full bg-gray-100 text-gray-600 p-4">
      {/* Follow requests */}
      <Requests />

      {/* Suggesteds */}
      <Suggesteds />
    </div>
  );
}

export default RightSidebar;
