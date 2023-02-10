import React from "react";
import "./index.css";
import { Box } from "@mui/material";
import { Navbar } from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./Route";
import { Footer } from "./Footer";

import { provider } from "react-ioc";
import { UserService } from "./store/UserService";
import { UsersDataStore } from "./store/UserStore";
import { BagStore } from "./store/BagStore";

import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";

const App = provider(
  UserService,
  UsersDataStore,
  BagStore
)(
  observer(() => {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <MyRoutes />
          {/* <Footer /> */}
        </BrowserRouter>
      </>
    );
  })
);

export default App;
