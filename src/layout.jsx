import React, { Children } from "react";
import Sidenav from "./scenes/sidenav";
import Navbar from "./scenes/navbar";
import FlexBox from "./components/FlexBox";
import { Box } from "@mui/material";
import Dashboard from "./scenes/dashboard";

function Layout({children}) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box>
        <Sidenav />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Navbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
