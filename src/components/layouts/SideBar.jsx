import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import HardwareIcon from '@mui/icons-material/Hardware';

const SideBar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  const drawerWidth = 240;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const NavTitle = ({ title }) => {
    return (
      <Box>
        <Divider />
        <Box className={`pl-${open ? 2 : 5} pt-2 flex flex-row items-center`}>
          <CategoryIcon fontSize="12px" />
          <Typography variant="h6" className="px-3 pl-2 text-" sx={{ opacity: open ? 1 : 0 }}>
            {title}
          </Typography>
        </Box>
      </Box>
    );
  };
  return (
    <Drawer variant="permanent" open={open}>
      <Box className="flex flex-row justify-between items-center bg-[#1a5bb3]">
        <Typography variant="h6" className="text-center pl-5 text-white font-extrabold">
          Admin
        </Typography>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{<ChevronLeftIcon className="text-white" />}</IconButton>
        </DrawerHeader>
      </Box>

      <NavTitle title="Mini Tools" />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <Link to="/mini-tools/gen-edm">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MarkEmailReadIcon />
              </ListItemIcon>
              <ListItemText primary={"EDM Generate"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
          <Link to="/">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HardwareIcon />
              </ListItemIcon>
              <ListItemText primary={"Tools 2"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <NavTitle title="Portfolios" />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <HardwareIcon />
            </ListItemIcon>
            <ListItemText primary={"Tools 2"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <HardwareIcon />
            </ListItemIcon>
            <ListItemText primary={"Tools 2"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
