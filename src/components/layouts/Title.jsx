import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const Title = ({ name }) => {
  return (
    <Box component="div" className="sticky top-0 bg-white z-10">
      <Typography variant="h5" className="p-2 ">
        {name}
      </Typography>
      <Divider />
    </Box>
  );
};

export default Title;
