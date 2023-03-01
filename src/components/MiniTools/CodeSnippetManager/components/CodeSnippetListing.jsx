import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import CodeSnippetBox from "./CodeSnippetBox";
import { codeSnippetList } from "../../../../actions/codeSnippets";
import { useDispatch, useSelector } from "react-redux";
import { selectCodeSnippetList, selectLoading, selectQueryParams } from "../../../../reducers/csm";
import Subtitle from "../../../layouts/Subtitle";

const CodeSnippetListing = () => {
  const csList = useSelector(selectCodeSnippetList);
  const showLoading = useSelector(selectLoading);

  const fallbackContent = () => {
    <Box component="div" className="flex justify-center items-center h-full">
      <CircularProgress />
    </Box>;
  };

  return (
    <Box component="div" className="ml-2 h-[80%]">
      <Subtitle title="Code Snippet Listing" position="center" />
      {showLoading ? (
        <Box component="div" className="flex justify-center items-center h-full">
          <CircularProgress />
        </Box>
      ) : csList?.length <= 0 ? (
        <Box component="div" className="flex justify-center items-center h-full">
          <Typography variant="h5">No Code Snippet Found!</Typography>
        </Box>
      ) : (
        <Grid container spacing={3} padding={3} className="!mb-12">
          {csList.map((cs) => {
            return (
              <Grid key={cs._id} item xs={12} md={6} lg={4}>
                <CodeSnippetBox {...cs} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default CodeSnippetListing;
