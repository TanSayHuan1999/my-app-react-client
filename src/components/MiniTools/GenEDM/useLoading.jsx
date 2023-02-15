import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const endLoading = () => setTimeout(() => setLoading(false), 1500);
  const Loading = () => {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={endLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };

  return { Loading, startLoading, endLoading };
};

export default useLoading;
