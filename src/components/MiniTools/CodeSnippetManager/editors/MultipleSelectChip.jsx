import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

export default function MultipleSelectChip({ options, value, onChange }) {
  return (
    <FormControl className="w-full">
      <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
      <Select
        name="tags"
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={value}
        onChange={onChange}
        variant="outlined"
        input={<OutlinedInput id="select-multiple-chip" label="Tags" variant="outlined" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {options.map((o, idx) => (
          <MenuItem key={idx} value={o}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
