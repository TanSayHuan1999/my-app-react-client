import { Edit as EditIcon, Preview as PreviewIcon } from "@mui/icons-material";
import { Divider, Paper, Typography, Box, Tabs, Tab, Grid, TextField, Button } from "@mui/material";
import React, { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../layouts/Title";
import useStyle from "./Styles";
import { edmAction } from "../../../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";
import useLoading from "../../../customHooks/useLoading";
import useAlert from "../../../customHooks/useAlert";

const CodeSnippetManager = () => {
  // Variable Declarations

  // States
  const [tab, setTab] = useState(0);
  const [finalEdmHtml, setFinalEdmHtml] = useState("");

  // Necessary Hooks
  const classes = useStyle();
  const dispatch = useDispatch();

  // Custom Hooks
  const { Alert, showAlert, hideAlert } = useAlert();
  const { Loading, startLoading, endLoading } = useLoading();

  // Components

  // Functions

  return (
    <Paper className="h-full overflow-y-auto p-3 pt-0">
      <Title name="Code Snippet Manager" />
      <h1>hhh</h1>
      <Loading />
      <Alert />
    </Paper>
  );
};

export default CodeSnippetManager;
