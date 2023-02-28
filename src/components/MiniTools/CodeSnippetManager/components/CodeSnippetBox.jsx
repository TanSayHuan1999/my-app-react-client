import { Button, Card, CardActions, CardContent, Chip, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CodeEditor from "../editors/CodeEditor";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDispatch } from "react-redux";
import { csmAction } from "../../../../constants/actionTypes";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";
import { codeSnippetDelete } from "../../../../actions/codeSnippets";
import useConfirmation from "../../../../customHooks/useConfirmation";
import Context from "../Context";
import { useContext } from "react";

const CodeSnippetBox = ({ _id, name, purpose, type, language, codes, output, tags, isFeatured, createdAt, updatedAt }) => {
  const { showConfirmation, showAlert } = useContext(Context);
  const dispatch = useDispatch();
  const handleViewCodeSnippet = () => dispatch({ type: csmAction.VIEW_CODE_SNIPPET, payload: _id });
  const handleRemoveCodeSnippet = async () => {
    let confirm = await showConfirmation("Are you sure you want to delete this code snippet?");
    if (confirm) {
      dispatch(codeSnippetDelete(_id));
      showAlert("success", "Successfully deleted code snippet!")
    }
  };

  const handleCodeSnippetDetails = () => {
    dispatch({ type: csmAction.CODE_SNIPPET_DETAILS, payload: _id });
  };
  return (
    <Card className="border-2 border-indigo-300 !rounded-xl hover:outline-none hover:ring hover:ring-blue-200 hover:-translate-y-1 cursor-pointer">
      <CardContent className="!pb-2 !h-[300px]" onClick={handleViewCodeSnippet}>
        <Box component="div" className="flex flex-row justify-between max-w-full">
          <Typography sx={{ fontSize: 14 }} color="text-secondary" className="truncate overflow-ellipsis" gutterBottom>
            {name}
          </Typography>
          <Chip label={type.toUpperCase()} color={type === "code_snippet" ? "primary" : "success"} />
        </Box>
        <Typography variant="h6">{language.toUpperCase()}</Typography>
        <Typography className="text-gray-500 !mb-3 overflow-x-auto whitespace-nowrap p-1">{tags.map((t) => `#${t} `)}</Typography>
        <Typography variant="body2" className="truncate overflow-ellipsis">
          {purpose}
        </Typography>
        <SyntaxHighlighter style={vscDarkPlus} language={language} className="h-[110px]">
          {codes}
        </SyntaxHighlighter>
        <Typography variant="caption" className="text-gray-500 !mt-3">
          Updated At: {new Date(updatedAt).toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions className="flex flex-row justify-between">
        <IconButton color="default" onClick={handleViewCodeSnippet}>
          <PreviewTwoToneIcon />
        </IconButton>
        <Box>
          <IconButton color="error" onClick={handleRemoveCodeSnippet}>
            <DeleteTwoToneIcon />
          </IconButton>
          <IconButton color="info" onClick={handleCodeSnippetDetails}>
            <CreateTwoToneIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default CodeSnippetBox;
