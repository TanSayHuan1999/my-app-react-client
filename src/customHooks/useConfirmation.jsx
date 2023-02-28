import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Title from "../components/layouts/Title";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const useConfirmation = () => {
  const [confirmation, setConfirmation] = useState({
    show: false,
    content: "",
  });
  const [resolveFn, setResolveFn] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenDialog = (content) => {
    return new Promise((resolve) => {
      setConfirmation({ show: true, content });
      setResolveFn(() => resolve);
    });
  };

  const handleDialog = (type) => {
    setConfirmation({ show: false, content: "" });
    resolveFn(type);
  };

  const ConfirmationDialog = () => (
    <Dialog fullScreen={fullScreen} open={confirmation.show} onClose={() => handleDialog(false)} maxWidth="md" fullWidth>
      <Title name="Confirmation" />
      <DialogContent className="!relative">{confirmation.content}</DialogContent>
      <DialogActions>
        <Button variant="contained" endIcon={<CloseIcon />} onClick={() => handleDialog(false)} color="error">
          Cancel
        </Button>
        <Button variant="contained" endIcon={<CheckIcon />} onClick={() => handleDialog(true)}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { ConfirmationDialog, showConfirmation: handleOpenDialog };
};

export default useConfirmation;
