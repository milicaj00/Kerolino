import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";
import { Shop } from "./Shop";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const MyRoutes = (user) => {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate replace to="/signin" />}
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};
