import Editor from "@monaco-editor/react";
import { FormControl, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const CodeEditor = ({ label, name, value, onChange }) => {
  const currLang = useSelector((state) => state.csm.currLanguage);
  return (
    <FormControl fullWidth>
      <Typography variant="h6">{`${label} ${name === "code_snippet" ? `(${currLang.toUpperCase()})` : ""}`}</Typography>
      <input type="hidden" name={`${name}_val`} value={value || ""} />
      <Editor
        name={name}
        theme="vs-dark"
        value={value || ""}
        className="border-2 border-gray-500 min-h-[120px]"
        language={name === "code_snippet" ? currLang : "plaintext"}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default CodeEditor;
