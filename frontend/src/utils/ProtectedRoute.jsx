import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/use-auth-store";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { userLogged, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!userLogged) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
