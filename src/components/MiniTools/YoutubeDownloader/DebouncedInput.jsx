import React, { useState } from "react";
import { debounce } from "lodash";
import TextField from "@material-ui/core/TextField";
import { useRef } from "react";

const DebouncedInput = ({ onChange, debounceTime = 1500, ...props }) => {
  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef(null);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceTime);
  };

  return <TextField {...props} value={inputValue} onChange={handleChange} />;
};

export default DebouncedInput;
