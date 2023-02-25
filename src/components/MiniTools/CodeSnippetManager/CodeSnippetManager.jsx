import { Edit as EditIcon, Preview as PreviewIcon } from "@mui/icons-material";
import { Paper, Typography, Box, Grid, TextField, InputAdornment, MenuItem, Card, CardContent, Fab, Pagination } from "@mui/material";
import React, { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../layouts/Title";
import { csmAction } from "../../../actions/actionTypes";
import useLoading from "../../../customHooks/useLoading";
import useAlert from "../../../customHooks/useAlert";
import SearchBox from "./SearchBox";
import SearchIcon from "@mui/icons-material/Search";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import CreateCodeSnippetDialog from "./CreateCodeSnippetDialog";

const CodeSnippetManager = () => {
  // Variable Declarations

  // States

  // Necessary Hooks
  const dispatch = useDispatch();

  // Custom Hooks
  const { Alert, showAlert, hideAlert } = useAlert();
  const { Loading, startLoading, endLoading } = useLoading();

  // Components
  const CodeSnippetBox = () => {
    return (
      <Card className="hover:outline-none hover:ring hover:ring-blue-200 hover:-translate-y-1 cursor-pointer">
        <CardContent className="!pb-2">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Title
          </Typography>
          <Typography variant="h6" component="div">
            Code Language
          </Typography>
          <Typography className="text-gray-500 !mb-3">#javascript #nodejs #express</Typography>
          <Typography variant="body2">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Typography>
          <Box className="bg-[#000000] mt-2 text-white p-2">
            {`
              [🍇,🍈,🍉,🍋,🍊].forEach(item => {
                console.log("item")
              }); ...
            `}
          </Box>
          <Typography variant="caption" className="text-gray-500 !mt-3">
            Updated At: 15-11-1999 03:03AM
          </Typography>
        </CardContent>
      </Card>
    );
  };

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

  const Listing = () => {
    return (
      <Grid container spacing={3} padding={3} className="!mb-12">
        <Grid item xs={12} md={6} lg={4}>
          <CodeSnippetBox />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CodeSnippetBox />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CodeSnippetBox />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CodeSnippetBox />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CodeSnippetBox />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CodeSnippetBox />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CodeSnippetBox />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CodeSnippetBox />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CodeSnippetBox />
        </Grid>
      </Grid>
    );
  };

  const FilteringArea = () => {
    return (
      <Box className="p-5 flex flex-row justify-between sticky top-[49px] bg-white z-10">
        <TextField
          className="w-1/2 !mr-1"
          label="Search For Code Snippet"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <TextField className="w-1/2 !ml-1" select label="Group By" variant="standard">
          <MenuItem value="language">Language</MenuItem>
          <MenuItem value="tags">Tags</MenuItem>
          <MenuItem value="cs_type">Code Snippet Typeppp</MenuItem>
        </TextField>
      </Box>
    );
  };

  // Functions
  const openDialog = () => dispatch({ type: csmAction.OPEN_DIALOG, payload: "create_code_snippet" });

  return (
    <Paper className="h-full overflow-y-auto p-3 pt-0 relative">
      <Title name="Code Snippet Manager" />
      <FilteringArea />
      <Listing />
      <FloatingBtn />
      <FloatingPgBtn />
      <Loading />
      <Alert />
      <CreateCodeSnippetDialog />
    </Paper>
  );
};

export default CodeSnippetManager;
