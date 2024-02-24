import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import AdbIcon from "@mui/icons-material/Adb";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { setLogin, setMode } from "../../redux/slices/userSlice";
import FlexBox from "../../components/FlexBox.jsx";
import './navbar.css'



function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // using theme
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const textMain = theme.palette.text.main;




  React.useEffect(() => {
    dispatch(
      setLogin({ user: { id: 1, name: "ajay", role: 1 }, token: "fhldafjdl" })
    );
  }, []);

  return (
    <AppBar
      position="sticky"
      className="navbar"
      sx={{ bgcolor: alt, boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { md: "row", sm: "column-reverse" },
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <Box
              className="navbar-logo"
              sx={{
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Typography variant="h5">Persistent</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => navigate("/")}
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: textMain,
                  textDecoration: "none",
                }}
              >
                File Validator
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <FlexBox className="navbar-SemiColons">
                <Typography variant="h5">SemiColons@2024</Typography>
              </FlexBox>
              <FlexBox sx={{ mr: 2 }} element={Box}>
                <IconButton onClick={() => dispatch(setMode())}>
                  {theme.palette.mode === "light" ? (
                    <DarkModeIcon sx={{ color: textMain }} />
                  ) : (
                    <LightModeIcon sx={{ color: textMain }} />
                  )}
                </IconButton>
              </FlexBox>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
