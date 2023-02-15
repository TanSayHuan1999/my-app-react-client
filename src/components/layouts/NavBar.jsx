import { MenuOpen as MenuOpenIcon } from "@mui/icons-material";
import { Box, IconButton, Toolbar, Typography, AppBar as MuiAppBar,  } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavBar = ({ handleDrawerOpen, open }) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuOpenIcon />
        </IconButton>
        <Box className="absolute right-3 flex flex-row items-center">
          <Box
            component="img"
            sx={{
              height: 45,
              width: 45,
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }}
            src="/logo.png"
          />
          <Typography noWrap className="pl-3">
            Say Huan
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
