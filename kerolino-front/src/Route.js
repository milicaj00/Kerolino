import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";
import { Shop } from "./Shop";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { ProfileAdmin } from "./ProfileAdmin";
import { UsersDataStore } from "./store/UserStore";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import { CheckOut } from "./CheckOut";

export const MyRoutes = observer(() => {
    const userStore = useInstance(UsersDataStore);
    return (
        <Routes>
            <Route path="/" element={<Shop />} />
            <Route
                path="/profile"
                element={
                    userStore.user ? (
                        userStore.user.is_seller ? (
                            <ProfileAdmin />
                        ) : (
                            <Profile user={userStore.user} />
                        )
                    ) : (
                        <Navigate replace to="/signin" />
                    )
                }
            />
            <Route
                path="/signin"
                element={
                    userStore.user ? <Navigate replace to="/" /> : <SignIn />
                }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/checkout" element={<CheckOut />} />
        </Routes>
    );
});
