import { useState } from "react";
import Navbar from "../navbar";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useTheme } from "@emotion/react";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import FlexBox from "../../components/FlexBox";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Sidenav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const alt = theme.palette.background.alt;
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidear = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor={alt}
      style={{ height: "100vh", zIndex: 9999 }}
    >
      <Menu style={{ padding: ".44rem 0" }}>
        <MenuItem
          icon={<img src={logo} alt="Logo" style={{ height: "50px" }} />}
          onClick={toggleSidear}
        ></MenuItem>
      </Menu>
      <Divider />
      <Menu>
        <MenuItem
          icon={<HomeOutlinedIcon sx={{ fontSize: "2rem" }} />}
          onClick={() => navigate("/dashboard")}
        >
          {" "}
          Dashboard{" "}
        </MenuItem>
        <MenuItem
          icon={<FileUploadOutlinedIcon sx={{ fontSize: "2rem" }} />}
          onClick={() => navigate("/fileupload")}
        >
          {" "}
          File Upload
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default Sidenav;
