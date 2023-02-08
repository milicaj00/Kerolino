import React from "react";

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
        <Box id="containter">
          <Navbar user={user} />
          <MyRoutes user={user} />
          {/* <Footer /> */}
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
