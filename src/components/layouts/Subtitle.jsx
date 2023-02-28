import { Divider } from "@mui/material";
import React from "react";

const Subtitle = ({ title, position = "center" }) => {
  return (
    <Divider textAlign={position} className="py-5 sticky top-0 bg-white z-10">
      {title}
    </Divider>
  );
};

export default Subtitle;
