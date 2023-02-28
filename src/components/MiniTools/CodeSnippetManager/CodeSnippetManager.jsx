import { Edit as EditIcon, Preview as PreviewIcon } from "@mui/icons-material";
import { Paper, Typography, Box, Grid, TextField, InputAdornment, MenuItem, Card, CardContent, Fab, Pagination } from "@mui/material";
import React, { useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../layouts/Title";
import { csmAction } from "../../../constants/actionTypes";
import useLoading from "../../../customHooks/useLoading";
import useAlert from "../../../customHooks/useAlert";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import CodeSnippetHandlingDialog from "./dialogs/CodeSnippetHandlingDialog";
import CodeSnippetListing from "./components/CodeSnippetListing";
import CodeSnippetFilter from "./components/CodeSnippetFilter";
import CodeSnippetViewingDialog from "./dialogs/CodeSnippetViewingDialog";
import useConfirmation from "../../../customHooks/useConfirmation";
import Context from "./Context";

const CodeSnippetManager = () => {
  // Variable Declarations
  // States

  // Necessary Hooks
  const dispatch = useDispatch();
  const { ConfirmationDialog, showConfirmation } = useConfirmation();

  // Custom Hooks
  const { Alert, showAlert, hideAlert } = useAlert();
  const { Loading, startLoading, endLoading } = useLoading();

  // Components

  const FloatingBtn = () => {
    return (
      <Fab
        variant="extended"
        className="!fixed bottom-10 right-20 w-[30px] !bg-indigo-500 opacity-90 hover:transform hover:scale-105 transition duration-2000 ease-linear "
        onClick={openDialog}
      >
        <LibraryAddIcon className="mr-1 text-indigo-100" />
        <Typography className="text-indigo-100">Create New Snippet</Typography>
      </Fab>
    );
  };

  const FloatingPgBtn = () => {
    return (
      <Box component="div" className="group !fixed bottom-10 opacity-90 w-[25%] sm:w-[19%]">
        <Fab variant="circular" color="primary" className="left-10 hover:transform hover:scale-90 transition duration-2000 ease-linear">
          <AutoStoriesSharpIcon className="mr-1 text-indigo-100" />
        </Fab>
        <Box
          component="div"
          className="opacity-0 invisible absolute z-10 bottom-2 left-[30%] w-full p-1 rounded-lg bg-white shadow-md group-hover:opacity-100 group-hover:visible transition duration-300"
        >
          <Pagination count={10} variant="outlined" color="primary" />
        </Box>
      </Box>
    );
  };

  // Functions
  const openDialog = () => dispatch({ type: csmAction.OPEN_DIALOG, payload: { dialogName: "handle_code_snippet", dialogAction: "create_code_snippet" } });

  return (
    <Context.Provider value={{ showConfirmation, showAlert }}>
      <Paper className="h-full p-3 pt-0 relative">
        <Title name="Code Snippet Manager" />
        <Grid container className="h-[90%]">
          <Grid item xs={12} md={3} className="h-full overflow-y-auto">
            <CodeSnippetFilter />
          </Grid>
          <Grid item xs={12} md={9} className="h-full overflow-y-auto">
            <CodeSnippetListing />
          </Grid>
        </Grid>
        <FloatingBtn />
        {/* <FloatingPgBtn /> */}
        <Loading />
        <Alert />
        <CodeSnippetHandlingDialog />
        <CodeSnippetViewingDialog />
        <ConfirmationDialog />
      </Paper>
    </Context.Provider>
  );
};

export default CodeSnippetManager;
