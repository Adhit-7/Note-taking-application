import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotesPage from "./pages/NotesPage";
import CategoriesPage from "./pages/CategoriesPage";
import Layout from "./components/Layout";
import Protected from "./components/Protected";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/notes" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Protected><Layout /></Protected>}>
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/notes" replace />} />
    </Routes>
  );
}
