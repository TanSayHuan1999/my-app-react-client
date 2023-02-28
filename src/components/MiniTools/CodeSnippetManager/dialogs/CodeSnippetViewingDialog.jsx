import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { csmAction } from "../../../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle, Box, Chip, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import Input from "../components/Input";
import { CreateCodeSnippetInputs } from "../Constant";
import Title from "../../../layouts/Title";
import PublishIcon from "@mui/icons-material/Publish";
import CloseIcon from "@mui/icons-material/Close";
import { codeSnippetAdd } from "../../../../actions/codeSnippets";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { selectCurrCodeSnippet, selectCurrDialog } from "../../../../reducers/csm";
import { useEffect } from "react";

export default function CodeSnippetViewingDialog() {
  const dialogName = "view_code_snippet";
  const dispatch = useDispatch();
  const dialogToOpen = useSelector(selectCurrDialog);
  const currCodeSnippet = useSelector(selectCurrCodeSnippet);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    dispatch({ type: csmAction.CLOSE_DIALOG });
  };

  return (
    <Dialog fullScreen={fullScreen} open={dialogToOpen === dialogName} onClose={handleClose} maxWidth="xl" fullWidth className="h-full">
      <DialogTitle>
        <Box className="flex flex-row justify-between p-3">
          <Typography>
            <strong>{currCodeSnippet.name}</strong>
          </Typography>
          <Chip label={currCodeSnippet.language} color="default" />
        </Box>
        <Divider />
      </DialogTitle>
      <DialogContent className="!px-0 !pt-1">
        <Alert variant="outlined" severity="info" className="mx-5 mb-2">
          <AlertTitle>Purpose</AlertTitle>
          <strong>{currCodeSnippet.purpose}</strong>
        </Alert>
        <Box component="div" className="h-[500px] overflow-y-auto p-3 flex flex-row gap-5 !pt-1 border-2 border-indigo-200 bg-indigo-50 mx-5 rounded-lg">
          <Box className="w-[45%]">
            <SyntaxHighlighter style={vscDarkPlus} language={currCodeSnippet.language} className="h-[99%] w-full rounded-lg">
              {currCodeSnippet.codes}
            </SyntaxHighlighter>
          </Box>
          <Box className="w-[55%] overflow-auto p-2 mt-[7px] bg-white rounded-lg">
            <Box component="div" dangerouslySetInnerHTML={{ __html: currCodeSnippet.output }} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" fullWidth onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
