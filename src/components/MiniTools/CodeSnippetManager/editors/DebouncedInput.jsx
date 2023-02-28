import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { memo } from "react";

const DebouncedInput = ({ name, value, onChange, onDebouncedChange }) => {
  const [searchTerm, setSearchTerm] = useState(value);
  useEffect(() => {
    if (searchTerm) {
      const timeoutId = setTimeout(() => {
        onDebouncedChange(searchTerm);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, onDebouncedChange]);

  return (
    <Box component="div">
      <TextField
        className="w-full"
        name={name}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        label="Search For Code Snippet"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </Box>
  );
};

export default memo(DebouncedInput);
