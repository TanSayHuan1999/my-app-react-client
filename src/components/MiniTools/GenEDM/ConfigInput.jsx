import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import ColorPicker from "material-ui-color-picker";
import { useDispatch, useSelector } from "react-redux";
import { edmAction } from "../../../constants/actionTypes";

const ConfigInput = ({ label, name, type, options }) => {
  const dispatch = useDispatch();
  const val = useSelector((state) => state.edm.input?.[name]);

  options ||= [];
  const handleValue = (e) => {
    dispatch({ type: edmAction.UPDATE_INPUT, payload: { name, value: type === "color" ? e : type === "switch" ? e.target.checked : e.target.value } });
    if (type === "switch") dispatch({ type: edmAction.HANDLE_CONTAINER, payload: { name, value: e.target.checked } });
    if (["edm_width", "kv_width", "image_path"].includes(name)) dispatch({ type: edmAction.UPDATE_IMG_PREVIEWER_INPUT, payload: {name, value: e.target.value} });
  };

  return type === "select" ? (
    <FormControl fullWidth>
      <InputLabel id={`select-${name}-lbl`}>{label}</InputLabel>
      <Select name={name} labelId={`select-${name}-lbl`} id={`select-${name}`} value={val || options[0].value} label={label} onChange={handleValue}>
        {options.map((o, idx) => {
          return (
            <MenuItem key={idx} value={o.value}>
              {o.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  ) : type === "color" ? (
    <FormControl fullWidth>
      <InputLabel variant="outlined">{val || label}</InputLabel>
      <ColorPicker name={name} value={val || "#ffffff"} variant="outlined" onChange={handleValue} />
      <Box className="w-[20px] h-[20px] absolute right-3 top-[30%] border-2" sx={{ backgroundColor: val || "#ffffff" }}></Box>
    </FormControl>
  ) : type === "switch" ? (
    <FormControlLabel
      value={label}
      control={<Switch name={name} color="primary" checked={val || false} onChange={handleValue} inputProps={{ "aria-label": "controlled" }} />}
      label={label}
      labelPlacement="start"
    />
  ) : (
    <TextField name={name} fullWidth label={label} variant="outlined" value={val || ""} onChange={handleValue} />
  );
};

export default ConfigInput;
