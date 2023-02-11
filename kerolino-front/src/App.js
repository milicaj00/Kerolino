import React from "react";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { Navbar } from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./Route";
import { Footer } from "./Footer";

import { provider, useInstance } from "react-ioc";
import { UserService } from "./store/UserService";
import { UsersDataStore } from "./store/UserStore";
import { BagStore } from "./store/BagStore";

import { observer } from "mobx-react-lite";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#92A9BD",
            contrastText: "white",
            light: "white"
        },
        secondary: {
            main: "#f193a8",
            contrastText: "white"
        },
        error: {
            main: "#a71313"
        },
        text: {
            primary: "#7F8487"
        }
    }
});

const App = provider(
    UserService,
    UsersDataStore,
    BagStore
)(
    observer(() => {
        const userStore = useInstance(UsersDataStore);

        if (userStore.loading) {
            return <div>Loading...</div>;
        }

        return (
            <ThemeProvider theme={theme}>
                <ToastContainer autoClose={1000} />
                <CssBaseline />
                <BrowserRouter>
                    <Navbar />
                    <MyRoutes />
                    <Footer />
                </BrowserRouter>
            </ThemeProvider>
        );
    })
);

export default App;
