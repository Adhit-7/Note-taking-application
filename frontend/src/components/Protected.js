import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Protected({ children }) {
  const { loading } = useAuth();
  const token = localStorage.getItem("token");

  if (loading) return null; // splash could go here
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
