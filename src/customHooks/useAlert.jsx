import React, { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const useAlert = () => {
  const [alert, setAlert] = useState({ open: false, type: "success", msg: "" });

  const showAlert = (type, msg) => setAlert({ open: true, type, msg });

  const hideAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setAlert({ ...alert, open: false });
  };

  const MAlert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const Alert = () => {
    return (
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={hideAlert}>
        <MAlert onClose={hideAlert} severity={alert.type} sx={{ width: "100%" }}>
          {alert.msg}
        </MAlert>
      </Snackbar>
    );
  };
  return { Alert, showAlert, hideAlert };
};

export default useAlert;
