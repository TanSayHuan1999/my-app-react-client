import { dividerClasses } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichTextEditor({ name, value, onChange }) {
  return (
    <>
      <input type="hidden" name={`${name}_val`} value={value || ""} />
      <ReactQuill
        name={name}
        style={{ height: "200px" }}
        value={value || ""}
        onChange={onChange}
        modules={{
          toolbar: [
            ["bold", "underline", "strike"],
            ["code-block", "link", "image", "video"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
          ],
        }}
      />
    </>
  );
}
