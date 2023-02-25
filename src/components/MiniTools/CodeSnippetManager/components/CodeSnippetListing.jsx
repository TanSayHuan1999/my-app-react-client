import { Box, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import CodeSnippetBox from "./CodeSnippetBox";
import { codeSnippetList } from "../../../../actions/codeSnippets";
import { useDispatch, useSelector } from "react-redux";
import { selectCodeSnippetList, selectQueryParams } from "../../../../reducers/csm";
import Subtitle from "../../../layouts/Subtitle";

const CodeSnippetListing = () => {
  // const dispatch = useDispatch();
  const csList = useSelector(selectCodeSnippetList);
  // useEffect(() => {
  //   // dispatch(codeSnippetList({}));
  // }, [dispatch]);

  return (
    <Box component="div" className="ml-2">
      <Subtitle title="Code Snippet Listing" position="center" />
      <Grid container spacing={3} padding={3} className="!mb-12">
        {csList.map((cs) => {
          return (
            <Grid key={cs._id} item xs={12} md={6} lg={4}>
              <CodeSnippetBox {...cs} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CodeSnippetListing;
