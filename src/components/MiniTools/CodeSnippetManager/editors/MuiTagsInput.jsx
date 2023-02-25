import { makeStyles } from "@material-ui/core/styles";
import TagsInput from "react-tagsinput";

const useStyles = makeStyles((theme) => ({
  tagsInput: {
    borderRadius: "5px",
    cursor: "auto",
    backgroundColor: "#fff",
    border: "1.5px solid #ccc",
    overflow: "hidden",
    paddingLeft: "10px",
    paddingTop: "10px",
    height: "100%",
    "&.react-tagsinput--focused": {
      borderColor: "#3277d4",
    },
    "& .react-tagsinput-tag": {
      backgroundColor: "#eee",
      borderRadius: "2px",
      border: "1px solid #000",
      color: "#000",
      display: "inline-block",
      fontFamily: "sans-serif",
      fontSize: "13px",
      fontWeight: 400,
      marginBottom: "5px",
      marginRight: "5px",
      padding: "5px",
      "& .react-tagsinput-remove": {
        cursor: "pointer",
        fontWeight: "bold",
        display: "inline-block",
        "&::before": {
          color: "#000",
          fontSize: "15px",
          content: "'x'",
          display: "block",
          marginLeft: "10px",
        },
      },
    },
    "& .react-tagsinput-input": {
      background: "transparent",
      border: "0",
      color: "#777",
      fontFamily: "sans-serif",
      fontSize: "16px",
      fontWeight: 400,
      marginBottom: "6px",
      marginTop: "1px",
      outline: "none",
      padding: "5px",
      width: "90px",
    },
  },
}));

export default function MuiTagsInput({ name, value, onChange }) {
  const classes = useStyles();
  return (
    <>
      <input type="hidden" name={`${name}_val`} value={value || []} />
      <TagsInput className={classes.tagsInput} name={name} value={value || []} onChange={onChange} />
    </>
  );
}
