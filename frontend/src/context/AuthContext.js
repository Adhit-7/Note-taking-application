import React, { createContext, useContext, useEffect, useState } from "react";
import api, { extractToken } from "../api/client";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    api.get("/user")
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/login", { email, password });
    const token = extractToken(data);
    if (token) localStorage.setItem("token", token);
    setUser(data.user || null);
    navigate("/notes", { replace: true });
  };

  const register = async (payload) => {
    const { data } = await api.post("/register", payload);
    const token = extractToken(data);
    if (token) localStorage.setItem("token", token);
    setUser(data.user || null);
    navigate("/notes", { replace: true });
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {}
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
