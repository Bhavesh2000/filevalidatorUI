import { createTheme } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSetting } from "./theme.js";
import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard/index.jsx";
import Fileupload from "./scenes/fileupload/index.jsx";
import Layout from "./layout.jsx";
import { SnackbarProvider, useSnackbar } from "notistack";

function App() {
  const mode = useSelector((state) => state.user.mode);
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={<Layout children={<Fileupload />} />}
            ></Route>
            <Route
              path="/dashboard"
              element={<Layout children={<Dashboard />} />}
            ></Route>
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
