import React from "react";
import "./index.css";
import { Box, CssBaseline } from "@mui/material";
import { Navbar } from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./Route";
import { Footer } from "./Footer";

import { provider } from "react-ioc";
import { UserService } from "./store/UserService";
import { UsersDataStore } from "./store/UserStore";
import { BagStore } from "./store/BagStore";

import { observer } from "mobx-react-lite";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#92A9BD",
            contrastText: "white",
            light: "white",
           
        },
        secondary: {
            main: "#323432",
            contrastText: "white"
        },
        error: {
            main: "#f83200"
        },
        text:{
          primary:'#7F8487'
        }
    }
});
const App = provider(
    UserService,
    UsersDataStore,
    BagStore
)(
    observer(() => {
        return (
            <ThemeProvider theme={theme}>
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
