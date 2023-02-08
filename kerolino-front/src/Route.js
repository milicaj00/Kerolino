import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";
import { Shop } from "./Shop";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { ProfileAdmin } from "./ProfileAdmin";

export const MyRoutes = ({user}) => {

  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route
        path="/profile"
        element={user ? <ProfileAdmin /> : <Navigate replace to="/signin" />}
      />
      <Route
        path="/signin"
        element={user ? <Navigate replace to="/" /> : <SignIn />}
      />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};
