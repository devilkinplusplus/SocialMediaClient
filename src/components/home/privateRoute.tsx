import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../common/services/utilities/jwtUtils";

const PrivateRoute: React.FC<any | any> = ({ children }) => {
  const isAuthenticatedUser = isAuthenticated();

  // If user is not authenticated, navigate them to the login page
  if (!isAuthenticatedUser) {
    return <Navigate to="/auth/login" />;
  }

  // If user is authenticated
  return <>{children}</>;
};

export default PrivateRoute;
