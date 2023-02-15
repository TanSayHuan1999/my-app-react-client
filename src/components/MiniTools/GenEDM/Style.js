import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  loadImgBox: {
    minHeight: "50px",
    maxHeight: "80vh",
    textAlign: "center",
    overflowY: "auto",
  },
  loadedImages: {
    display: "inline-block",
    float: "left",
    cursor: "pointer",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
    "&:hover": {
      opacity: 0.9,
      border: "0.5px solid grey"
    },
  },
}));
