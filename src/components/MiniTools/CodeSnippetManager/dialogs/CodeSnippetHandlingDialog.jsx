import React, { useEffect, useState } from "react";
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
import { Box, Grid, TextField } from "@mui/material";
import Input from "../components/Input";
import { CreateCodeSnippetInputs } from "../Constant";
import Title from "../../../layouts/Title";
import PublishIcon from "@mui/icons-material/Publish";
import CloseIcon from "@mui/icons-material/Close";
import { codeSnippetAdd, codeSnippetEdit } from "../../../../actions/codeSnippets";
import { selectCurrCodeSnippet, selectCurrDialog, selectCurrDialogAction } from "../../../../reducers/csm";
import { useContext } from "react";
import Context from "../Context";

export default function CodeSnippetCreationDialog() {
  const { showAlert } = useContext(Context);
  const dialogName = "handle_code_snippet";
  const [codeSnippetInputs, setCodeSnippetInputs] = useState([]);
  const dispatch = useDispatch();
  const dialogToOpen = useSelector(selectCurrDialog);
  const dialogAction = useSelector(selectCurrDialogAction);
  const currCodeSnippet = useSelector(selectCurrCodeSnippet);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isEdit = dialogAction === "edit_code_snippet";
  const isCreate = dialogAction === "create_code_snippet";
  const handleClose = () => dispatch({ type: csmAction.CLOSE_DIALOG });
  const handleSubmit = (e) => {
    e.preventDefault();
    let fd = Object.fromEntries(new FormData(e.target));
    let newCodeSnippet = { ...fd, isFeatured: fd?.isFeatured ? true : false };
    if (isEdit) dispatch(codeSnippetEdit(currCodeSnippet._id, newCodeSnippet));
    else dispatch(codeSnippetAdd(newCodeSnippet));
    showAlert("success", `Successfully ${isEdit ? "edited" : "added"} code snippet`);
  };

  useEffect(() => {
    setCodeSnippetInputs(
      CreateCodeSnippetInputs.map((i) => {
        const obj = { ...i };
        if (isEdit) {
          obj.currValue = currCodeSnippet[i.name];
        }
        return obj;
      })
    );
    if (isEdit) dispatch({ type: csmAction.UPDATE_CURR_LANG, payload: currCodeSnippet.language });
  }, [currCodeSnippet, dialogAction]);

  const show = dialogToOpen === dialogName && (isCreate || (isEdit && !!codeSnippetInputs[0]?.currValue));
  console.log(currCodeSnippet);
  return (
    <Dialog fullScreen={fullScreen} open={show || false} onClose={handleClose} maxWidth="xl" fullWidth className="h-full">
      <Title name="Code Snippet" />
      <DialogContent className="!relative">
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <Grid container className="gap-y-3 flex flex-row justify-between mb-16" columns={13}>
            {codeSnippetInputs.map((i, idx) => (
              <Input key={idx} {...i} />
            ))}
          </Grid>
          <Box className="!sticky flex justify-end bottom-3 w-full gap-2 !pe-2">
            <Button variant="contained" endIcon={<CloseIcon />} type="button" onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button variant="contained" endIcon={<PublishIcon />} type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
