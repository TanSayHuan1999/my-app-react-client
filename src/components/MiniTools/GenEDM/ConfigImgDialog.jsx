import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Zoom from "@mui/material/Zoom";
import { useDispatch, useSelector } from "react-redux";
import { edmAction } from "../../../actions/actionTypes";
import { Box, Divider, FormControl, InputLabel, TextField } from "@mui/material";
import ColorPicker from "material-ui-color-picker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export default function ConfigImgDialog() {
  const dialog = useSelector((state) => state.edm.configImgDialog);
  const dispatch = useDispatch();
  const handleConfirm = () => dispatch({ type: edmAction.CONFIRM_CONFIG_IMG_DIALOG });
  const handleClose = () => dispatch({ type: edmAction.CLOSE_CONFIG_IMG_DIALOG });
  const handleDialogInput = (e, name) => {
    let value = name === "rowBgColor" ? e : e.target.value;
    dispatch({ type: edmAction.UPDATE_DIALOG_INPUT, payload: { name, value } });
  };
  return (
    <Dialog open={dialog.open} TransitionComponent={Transition} keepMounted onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Image Setting</DialogTitle>
      <DialogContent className="max-h-[550px] min-h-[550px] flex flex-col">
        <Box className="h-[200px] overflow-y-auto flex border-2 border-gray-100">
          <Box component="img" src={dialog.setting.imgObjUrl} className="w-full my-auto"></Box>
        </Box>
        <Box component="form" className="flex flex-col gap-2 flex-1 h-full justify-evenly" autoComplete="off">
          <FormControl>
            <InputLabel variant="outlined">{dialog.setting.rowBgColor || "Row Background"}</InputLabel>
            <ColorPicker
              name="rowBgColor"
              value={dialog.setting.rowBgColor || "#ffffff"}
              variant="outlined"
              onChange={(e) => handleDialogInput(e, "rowBgColor")}
            />
            <Box className="w-[20px] h-[20px] absolute right-3 top-[30%] border-2" sx={{ backgroundColor: dialog.setting.rowBgColor || "#ffffff" }}></Box>
          </FormControl>
          <TextField name="href" label="Hyperlink" variant="outlined" value={dialog.setting.href || ""} onChange={(e) => handleDialogInput(e, "href")} />
          <TextField name="alt" label="ALT" variant="outlined" value={dialog.setting.alt || ""} onChange={(e) => handleDialogInput(e, "alt")} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
