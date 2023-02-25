import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { csmAction } from "../../../actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, TextField } from "@mui/material";
import Input from "./Input";
import { CreateCodeSnippetInputs } from "./Constant";
import Title from "../../layouts/Title";
import PublishIcon from "@mui/icons-material/Publish";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateCodeSnippetDialog() {
  const dialogName = "create_code_snippet";
  const dispatch = useDispatch();
  const dialogToOpen = useSelector((state) => state.csm.showDialog);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => dispatch({ type: csmAction.CLOSE_DIALOG });
  const handleSubmit = (e) => {
    e.preventDefault();
    let fd = Object.fromEntries(new FormData(e.target));
    console.log(fd);
  };

  return (
    <Dialog fullScreen={fullScreen} open={dialogToOpen === dialogName} onClose={handleClose} maxWidth="xl" fullWidth className="h-full">
      <Title name="Create Code Snippet" />
      <DialogContent className="!relative">
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <Grid container className="gap-y-3 flex flex-row justify-between mb-16" columns={13}>
            {CreateCodeSnippetInputs.map((i, idx) => (
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
