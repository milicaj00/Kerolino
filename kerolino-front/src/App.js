import React from "react";
import "./index.css";
import { Box } from "@mui/material";
import { Navbar } from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./Route";
import { Footer } from "./Footer";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, []);

  return (
    <>
      <BrowserRouter>
          <Navbar user={user} />
          <MyRoutes user={user} />
          {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
