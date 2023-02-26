import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import { Box, Typography } from "@mui/material";
import Home2 from "./components/Home/Home2";
import NavBar from "./components/layouts/NavBar";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SideBar from "./components/layouts/SideBar";
import GenEDM from "./components/MiniTools/GenEDM/GenEDM";
import CodeSnippetManager from "./components/MiniTools/CodeSnippetManager/CodeSnippetManager";

const App = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", height: "100%" }}>
        <CssBaseline />
        <NavBar handleDrawerOpen={handleDrawerOpen} open={open} />
        <SideBar handleDrawerClose={handleDrawerClose} open={open} />
        <Box component="main" sx={{ flex: 1, p: 2, pt: 10 }}>
          {/* <DrawerHeader /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/mini-tools/gen-edm" element={<GenEDM />} />
            <Route path="/mini-tools/code-snippet-manager" element={<CodeSnippetManager />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
