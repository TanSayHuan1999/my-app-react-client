import { Api, Edit as EditIcon, Preview as PreviewIcon } from "@mui/icons-material";
import { Divider, Paper, Typography, Box, Tabs, Tab, Grid, TextField, Button, IconButton } from "@mui/material";
import React, { useState, memo, useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../layouts/Title";
// import useStyle from "./Styles";
import { edmAction } from "../../../constants/actionTypes";
import { v4 as uuidv4 } from "uuid";
import useLoading from "../../../customHooks/useLoading";
import useAlert from "../../../customHooks/useAlert";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DebouncedInput from "./DebouncedInput";
import API from "../../../utils/API";
import axios from "axios";

const YoutubeDownloader = () => {
  // Variable Declarations
  const prefix = process.env.REACT_APP_YT_DOWNLOADER_ROUTE_PREFIX;

  // States
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition({
    timeoutMs: 3000,
  });

  useEffect(() => {
    startTransition(() => {
      if (query) {
        API.get(`${prefix}/list?q=${query}`)
          .then((res) => {
            console.log(res);
            setVideos(res.data);
          })
          .catch((err) => console.log(err));
      }
    });
  }, [query]);
  // Necessary Hooks

  // Custom Hooks

  const handleSearch = (e) => {
    setQuery(e);
  };

  // Components

  // Functions
  const downloadYoutube = async (format, vid) => {
    if (vid) {
      let res = await axios({ url: `${process.env.REACT_APP_BASE_URL}${prefix}/download?format=${format}&vid=${vid}`, method: "GET", responseType: "blob" });
      console.log(res);
      if (res.status === 200) {
        // Create a blob object from the response
        const blob = new Blob([res.data], { type: res.headers["content-type"] });

        // Create a URL object from the blob object
        const url = URL.createObjectURL(blob);

        // Create a link element and click it to initiate download
        const link = document.createElement("a");
        link.href = url;
        link.download = `file.${format}`;
        link.click();

        // Revoke the URL object to free up memory
        URL.revokeObjectURL(url);
      }
    }
  };

  const VideoBox = ({ vid, title, channel, desc, thumbnails }) => {
    return (
      <Box component="div" className="group bg-white border border-gray-200 my-2 mx-10 rounded-xl cursor-pointer flex justify-between items-center py-5 px-3 transition-all hover:scale-105 duration-300">
        <Box component="div" className="flex flex-row gap-2">
          <Box component="img" src={thumbnails} className="rounded-2xl w-[200px] h-[150px] object-cover"></Box>
          <Box component="div" className="flex flex-col gap-2">
            <Typography variant="h5" className="max-w-[600px] truncate">
              {title}
            </Typography>
            <Typography variant="h6">{channel}</Typography>
            <Box component="small">10M Views - 3 years ago</Box>
            <Box component="small" className="font-extrabold max-w-[600px] truncate">
              {desc}
            </Box>
          </Box>
        </Box>
        <Box component="div" className="text-white font-bold py-2 px-4 rounded-full">
          <Box component="div" className="flex flex-row gap-x-8">
            <Button variant="contained" color="error" className="flex flex-col" onClick={() => downloadYoutube("mp3", vid)}>
              <LibraryMusicIcon />
              <Typography className="size-">Download Music</Typography>
            </Button>
            <Button variant="contained" color="primary" className="flex flex-col" onClick={() => downloadYoutube("mp4", vid)}>
              <VideoLibraryIcon />
              <Typography className="text-[5px]">Download Video</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  console.log("render.......");

  return (
    <Paper className="h-full overflow-y-auto p-3 pt-0">
      <Title name="Code Snippet Manager" />
      <DebouncedInput variant="outlined" label="Search Video Here..." className="w-full !my-5 !mx-2" onChange={handleSearch} />
      <Box component="div">
        {isPending && "Please wait..."}
        {videos.map((v) => {
          return <VideoBox key={v.id.videoId} vid={v.id.videoId} title={v.snippet.title} desc={v.snippet.description} channel={v.snippet.channelTitle} thumbnails={v.snippet.thumbnails?.high?.url} />;
        })}
      </Box>
    </Paper>
  );
};

export default YoutubeDownloader;
