import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { CheckCircleOutline, ClearAllOutlined } from "@mui/icons-material";
const CustomSwitch = withStyles({
  switchBase: {
    color: "#2196f3",
    "&$checked": {
      color: "#009688",
    },
    "&$checked + $track": {
      backgroundColor: "#009688",
    },
    "& $checkedIcon": {
      fill: "#fff",
      border: "1px solid white"
    },
  },
  checked: {},
  track: {},
  checkedIcon: {
    width: 20,
    height: 20,
  },
  icon: {
    "&$iconOff": {
      color: "#EF4444",
    },
  },
  iconOff: {},
})(Switch);

export default function StatusSwitch() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return <CustomSwitch checked={checked} onChange={handleChange} name="checked" icon={<ClearAllOutlined />} checkedIcon={<CheckCircleOutline />} />;
}
