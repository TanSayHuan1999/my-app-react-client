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
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Input from "../components/Input";
import { CreateCodeSnippetInputs } from "../Constant";
import Title from "../../../layouts/Title";
import PublishIcon from "@mui/icons-material/Publish";
import CloseIcon from "@mui/icons-material/Close";
import { codeSnippetAdd } from "../../../../actions/codeSnippets";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { selectCurrCodeSnippet, selectCurrDialog } from "../../../../reducers/csm";

export default function CodeSnippetViewingDialog() {
  const dialogName = "view_code_snippet";
  const dispatch = useDispatch();
  const dialogToOpen = useSelector(selectCurrDialog);
  const currCodeSnippet = useSelector(selectCurrCodeSnippet);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => dispatch({ type: csmAction.CLOSE_DIALOG });

  return (
    <Dialog fullScreen={fullScreen} open={dialogToOpen === dialogName} onClose={handleClose} maxWidth="xl" fullWidth className="h-full">
      <Title name="View Code Snippet" />
      <DialogContent className="!px-0 !pt-1">
        <Box component="div" className="h-[500px] overflow-y-auto p-5 flex flex-row gap-5 !pt-1">
          <Box className="w-[45%]">
            <SyntaxHighlighter style={vscDarkPlus} language={currCodeSnippet.language} className="h-[99%] w-full">
              {currCodeSnippet.codes}
            </SyntaxHighlighter>
          </Box>
          <Paper className="w-[55%] overflow-auto p-2">
            <Box component="div" dangerouslySetInnerHTML={{ __html: currCodeSnippet.output }} />
          </Paper>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
