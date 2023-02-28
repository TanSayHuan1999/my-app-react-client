import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import ColorPicker from "material-ui-color-picker";
import { useDispatch } from "react-redux";
import { csmAction } from "../../../../constants/actionTypes";
import CodeEditor from "../editors/CodeEditor";

import RichTextEditor from "../editors/RichTextEditor";
import MuiTagsInput from "../editors/MuiTagsInput";

const Input = ({ label, name, type, options, occupyMode, currValue }) => {
  console.log("render...");
  const dispatch = useDispatch();
  const [val, setVal] = useState(currValue || "");
  options ||= [];
  const handleValue = (e) => {
    setVal(["color", "codeEditor", "image", "tags", "richTextEditor"].includes(type) ? e : type === "switch" ? e.target.checked : e.target.value);
    if (name === "language") dispatch({ type: csmAction.UPDATE_CURR_LANG, payload: e.target.value });
  };

  return (
    <Grid item xs={12} md={occupyMode === "1/4" ? 3 : occupyMode === "1/3" ? 4 : occupyMode === "1/2" ? 6 : 13} className="flex-1">
      {type === "select" ? (
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
      ) : type === "textarea" ? (
        <TextField name={name} label={label} fullWidth multiline rows={4} value={val || ""} onChange={handleValue} />
      ) : type === "codeEditor" ? (
        <CodeEditor name={name} label={label} value={val} onChange={handleValue} />
      ) : type === "tags" ? (
        <MuiTagsInput name={name} value={val || []} onChange={handleValue} />
      ) : type === "richTextEditor" ? (
        <FormControl fullWidth>
          <Typography variant="h6">{label}</Typography>
          <RichTextEditor name={name} value={val || []} onChange={handleValue} />
        </FormControl>
      ) : (
        <TextField name={name} fullWidth label={label} variant="outlined" value={val || ""} onChange={handleValue} />
      )}
    </Grid>
  );
};

export default memo(Input);
