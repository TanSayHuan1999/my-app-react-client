import { Backdrop, Box, Button, CircularProgress, Divider, Fab, InputAdornment, MenuItem, Pagination, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { CreateCodeSnippetInputs } from "../Constant";
import MuiTagsInput from "../editors/MuiTagsInput";
import MultipleSelectChip from "../editors/MultipleSelectChip";
import Title from "../../../layouts/Title";
import Subtitle from "../../../layouts/Subtitle";
import { useState } from "react";
import { codeSnippetList, getTags } from "../../../../actions/codeSnippets";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectListTotalPages, selectLoading, selectTags } from "../../../../reducers/csm";
import DebouncedInput from "../editors/DebouncedInput";
import { debounce } from "lodash";
import { useCallback } from "react";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";

const CodeSnippetFilter = () => {
  const initialQuery = { type: "", language: "", search: "", tags: [], sortBy: "", sortDir: "asc", page: 1, limit: 6 };
  const dispatch = useDispatch();
  const [query, setQuery] = useState(initialQuery);
  const languageList = CreateCodeSnippetInputs.find((i) => i.name === "language")?.options;
  const totalPages = useSelector(selectListTotalPages);
  const tags = useSelector(selectTags);

  useEffect(() => {
    dispatch(getTags());
    dispatch(codeSnippetList(query));
  }, [dispatch]);

  // Define a debounced version of the codeSnippetList function
  const debouncedDispatchFetch = useCallback(
    debounce((query) => {
      dispatch(codeSnippetList(query));
    }, 500),
    [dispatch]
  );
  const normalDispatchFetch = (query) => dispatch(codeSnippetList(query));

  const handleValue = (e, pageNo) => {
    const { name, value } = e.target;
    if (name === "search") {
      debouncedDispatchFetch({ ...query, [name]: value });
    } else {
      normalDispatchFetch({ ...query, [name]: name === "tags" ? (typeof value === "string" ? value.split(",") : value) : value });
    }
    setQuery({ ...query, [name]: value });
  };

  const clearAllQuery = () => {
    setQuery(initialQuery);
    normalDispatchFetch(initialQuery);
  };

  const FloatingPgBtn = () => {
    return (
      <Box component="div" className="group !fixed bottom-10 opacity-90 w-[25%] sm:w-[19%]">
        <Fab variant="circular" color="primary" className="left-10 hover:transform hover:scale-90 transition duration-2000 ease-linear">
          <AutoStoriesSharpIcon className="mr-1 text-indigo-100" />
        </Fab>
        <Box
          component="div"
          className="opacity-0 invisible absolute z-10 bottom-2 left-[30%] w-full p-1 rounded-lg bg-white shadow-md group-hover:opacity-100 group-hover:visible transition duration-300"
        >
          <Pagination
            count={totalPages}
            variant="outlined"
            color="primary"
            page={query.page * 1}
            onChange={(e, v) => {
              e.target.name = "page";
              e.target.value = v;
              handleValue(e);
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Subtitle title="Query Parameters" position="center" />
      <Box className="bg-white z-10 flex flex-col gap-12 mt-2 mr-3">
        <Box component="div" className="flex flex-row justify-between">
          <TextField className="w-1/2" name="type" select label="Type" variant="outlined" value={query.type} onChange={handleValue}>
            <MenuItem value="">Unset</MenuItem>
            <MenuItem value="code_snippet">Code Snippet</MenuItem>
            <MenuItem value="problem_solving">Problem solving</MenuItem>
          </TextField>
          <TextField className="w-1/2 !ml-1" name="language" select label="Language" variant="outlined" value={query.language} onChange={handleValue}>
            <MenuItem value="">Unset</MenuItem>
            {languageList.map((l, idx) => (
              <MenuItem key={idx} value={l.value}>
                {l.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box component="div">
          <TextField
            className="w-full"
            name="search"
            value={query.search}
            onChange={handleValue}
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
          {/* <DebouncedInput
            value={query.search}
            onChange={(e) => setQuery({ ...query, search: e.target.value })}
            onDebouncedChange={(value) => setQuery((prevState) => ({ ...prevState, search: value }))}
          /> */}
        </Box>

        <Box component="div">
          <MultipleSelectChip options={tags} value={query.tags} onChange={handleValue} />
        </Box>

        <Box component="div" className="flex flex-row justify-between">
          <TextField className="w-1/2" name="sortBy" select label="Sort By" variant="outlined" value={query.sortBy} onChange={handleValue}>
            <MenuItem value="">Unset</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="type">Type</MenuItem>
            <MenuItem value="createdAt">Created At</MenuItem>
            <MenuItem value="updatedAt">Updated At</MenuItem>
          </TextField>
          <TextField className="w-1/2 !ml-1" name="sortDir" select label="Sort Direction" variant="outlined" value={query.sortDir} onChange={handleValue}>
            <MenuItem value="">Unset</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Decending</MenuItem>
          </TextField>
        </Box>

        <Box component="div" className="flex flex-row justify-between">
          <TextField className="w-1/2" name="limit" label="Page Limit" type="number" variant="outlined" value={query.limit} onChange={handleValue} />
          <TextField className="w-1/2 !ml-1" name="page" label="Page No" type="number" variant="outlined" value={query.page} onChange={handleValue} />
        </Box>

        <Button variant="contained" color="error" onClick={clearAllQuery}>
          Clear All Query
        </Button>
      </Box>
      <FloatingPgBtn />
    </>
  );
};

export default CodeSnippetFilter;
