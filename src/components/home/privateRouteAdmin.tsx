import React, { useEffect } from "react";
import { Route, Navigate,useNavigate } from "react-router-dom";
import { decodeJWT , hasAdminAccess } from "../../common/services/utilities/jwtUtils";


const PrivateRouteAdmin: React.FC<any | any> = ({ children }) => {
  const isAdminUser = hasAdminAccess();

  // If user is not admin, navigate them to the main page
  if (!isAdminUser) {
    return <Navigate to="/" />;
  }

  // If user is admin
  return <>{children}</>;
};

export default PrivateRouteAdmin;
