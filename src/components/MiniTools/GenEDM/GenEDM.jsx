import { Edit as EditIcon, Preview as PreviewIcon } from "@mui/icons-material";
import { Divider, Paper, Typography, Box, Tabs, Tab, Grid, Container, TextField, Button } from "@mui/material";
import React, { useCallback, useState, memo, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import ConfigInput from "./ConfigInput";
import { useController, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useTabPanel from "./useTabPanel";
import Title from "../../layouts/Title";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import useStyle from "./Style.js";
import { edmAction } from "../../../actions/actionTypes";
import ConfigImgDialog from "./ConfigImgDialog";
import isEqual from "lodash/isEqual";
import { v4 as uuidv4 } from "uuid";
import { EdmConfigInputs, EdmStyles } from "./Constant";
import useLoading from "./useLoading";
import Swal from "sweetalert2";
import useAlert from "./useAlert";

const GenEDM = () => {
  // Variable Declarations
  // let finalEdmHtml = "";

  // States
  const [tab, setTab] = useState(0);
  const [finalEdmHtml, setFinalEdmHtml] = useState("");

  // Necessary Hooks
  const classes = useStyle();
  const dispatch = useDispatch();

  // Custom Hooks
  const { TabPanel, a11yProps } = useTabPanel();
  const { Alert, showAlert, hideAlert } = useAlert();
  const { Loading, startLoading, endLoading } = useLoading();

  // Components
  const TabList = () => {
    return (
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(e, val) => setTab(val)} aria-label="basic tabs example">
          <Tab icon={<EditIcon fontSize="medium" />} label="Edit" {...a11yProps()} />
          <Tab icon={<PreviewIcon fontSize="medium" />} label="Preview" {...a11yProps()} />
        </Tabs>
      </Box>
    );
  };

  const CTNFooterArea = () => {
    return (
      useSelector((state) => state.edm.showContainer["footer_area"]) && (
        <Box className="mx-3">
          <CustomDivider title="Footer Area" position="left" />
          <TextField label="Content" multiline rows={4} className="w-full" />
        </Box>
      )
    );
  };

  const CTNBrowserPreview = () => {
    return (
      useSelector((state) => state.edm.showContainer["browser_preview"]) && (
        <Box className="mx-3">
          <CustomDivider title="Browser Preview" position="left" />
          <TextField label="Content" multiline rows={4} className="w-full" />
        </Box>
      )
    );
  };

  const CTNLoadScript = () => {
    return (
      useSelector((state) => state.edm.showContainer["load_script"]) && (
        <Box className="mx-3">
          <CustomDivider title="Load Script" position="left" />
          <TextField label="Content" multiline rows={4} className="w-full" />
        </Box>
      )
    );
  };

  const TABConfigEdm = () => {
    const ImgFileList = useSelector((state) => state.edm.imgPreviewer.img_file_list);
    const handleSubmit = async (e) => {
      startLoading();
      e.preventDefault();
      const Input = Object.fromEntries(new FormData(document.getElementById("edmConfigForm")));
      let edmHTML = await handleGenerateEdmHtml(Input, ImgFileList);
      console.log(edmHTML);
      let success = false;
      endLoading();
      if (edmHTML) {
        success = true;
        setFinalEdmHtml(edmHTML);
        // document.getElementById("edmPreviewContainer").innerHTML = finalEdmHtml;
      }
      setTimeout(() => showAlert(success ? "success" : "error", success ? "EDM HTML Generated Succesfully!" : "Failed To Generate EDM HTML!"), 1800);
    };
    return (
      <TabPanel value={tab} index={0}>
        {/* <Box component="form" id="edmConfigForm"> */}
        <Box component="form" id="edmConfigForm" onSubmit={handleSubmit}>
          <CustomDivider title="EDM Config" poaition="center" />
          <Grid container className="p-3 gap-x-1 gap-y-3 justify-between" columns={13}>
            {EdmConfigInputs["general"].map((i, idx) => {
              return (
                <Grid item key={i.name} xs={12} md={4}>
                  <ConfigInput {...i} />
                </Grid>
              );
            })}
            {EdmConfigInputs["switch"].map((i, idx) => {
              return (
                <Grid item key={i.name} xs={12} md={3}>
                  <ConfigInput {...i} type="switch" />
                </Grid>
              );
            })}
          </Grid>
          <CustomDivider title="Actions" poaition="center" />

          <Grid container className="p-3 gap-x-1 gap-y-3 justify-between" columns={15}>
            <Grid item xs={7} md={3}>
              <Button variant="contained" fullWidth color="success" component="label" className="flex flex-col !px-0">
                <DriveFolderUploadIcon className="mr-1" />
                <Typography>Upload Image</Typography>
                <input hidden accept="image/*" multiple type="file" onChange={handleImageUpload} />
              </Button>
            </Grid>
            <Grid item xs={7} md={3}>
              <Button variant="contained" fullWidth color="primary" className="flex flex-col !px-0" type="submit">
                <AutoFixHighIcon className="mr-1" />
                <Typography>Generate EDM</Typography>
              </Button>
            </Grid>
            <Grid item xs={7} md={3}>
              <Button variant="contained" fullWidth color="warning" className="flex flex-col !px-0" onClick={copyCode}>
                <ContentCopyIcon className="mr-1" />
                <Typography>Copy Code</Typography>
              </Button>
            </Grid>
            <Grid item xs={7} md={3}>
              <Button variant="contained" fullWidth color="info" className="flex flex-col !px-0" onClick={downloadCode}>
                <DownloadIcon className="mr-1" />
                <Typography>Download Code</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Conditional Container Area : BEGIN */}
        <CTNFooterArea />
        <CTNBrowserPreview />
        <CTNLoadScript />
        {/* Conditional Container Area : END */}

        <ImageConfigPreview />
      </TabPanel>
    );
  };

  const TABPreviewEdm = () => {
    return (
      <TabPanel value={tab} index={1}>
        <div dangerouslySetInnerHTML={{ __html: finalEdmHtml }} />
      </TabPanel>
    );
  };

  const ImageConfigPreview = () => {
    const imgPreviewer = useSelector((state) => state.edm.imgPreviewer);

    return (
      imgPreviewer.img_file_list.length > 0 && (
        <Paper className="p-2">
          <CustomDivider poaition="center" title="Local Image Preview & Config" />
          <Box className={`${classes.loadImgBox} p-2`}>
            {imgPreviewer.img_file_list.map((file) => {
              return <ImgBox key={file.data.id} displayWidth={file.data.displayWidth} imgObjUrl={file.data.imgObjUrl} />;
            })}
          </Box>
        </Paper>
      )
    );
  };

  const ImgBox = memo(
    ({ displayWidth, imgObjUrl }) => {
      return (
        <Box
          component="img"
          className={`${classes.loadedImages}`}
          sx={{ width: displayWidth }}
          src={imgObjUrl}
          onClick={() => handleOpenConfigImgDialog(imgObjUrl)}
        ></Box>
      );
    },
    (prev, next) => prev.imgObjUrl === next.imgObjUrl
  );

  // Functions
  const handleGenerateEdmHtml = (configInput, imgFileList) => {
    return new Promise(async (resolve) => {
      let edmHTML = "";
      var temporary_width = 0;
      let { edm_width, kv_width, image_path, pre_header, table_bgcolor } = configInput;
      pre_header ||= "";
      table_bgcolor ||= "#ffffff";
      edm_width *= 1;
      kv_width *= 1;
      if (imgFileList.length > 0 && edm_width && kv_width && image_path && EdmStyles) {
        edmHTML += `<meta charset="UTF-8"/>
                    <div>
                    <style>${EdmStyles}</style>
                    </div>
                    <table class="main" style="border-collapse: collapse !important; border-spacing: 0px !important; table-layout: fixed !important; margin: 0px auto !important; width: 100%;" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                    <tbody>
                    <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td align="center" valign="top" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;">
                    <!-- Visually Hidden Preheader Text : BEGIN -->
                    <div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                    ${pre_header}
                    </div>
                    <!-- Visually Hidden Preheader Text : END -->
                    <div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width: ${edm_width}px;">
                    <!--[if (gte mso 9)|(IE)]>
                    <table cellspacing="0" cellpadding="0" border="0" width="${edm_width}" align="center" style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;border-spacing:0 !important;border-collapse:collapse !important;table-layout:fixed !important;margin:0 auto !important;" mce_style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;border-spacing:0 !important;border-collapse:collapse !important;table-layout:fixed !important;margin:0 auto !important;">
                    <tr style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;" mce_style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;" >
                    <td style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;" mce_style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;">
                    <![endif]-->
                    <!-- Email Body : BEGIN -->
                    <table style="max-width: ${edm_width}px; border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: ${table_bgcolor};" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="${table_bgcolor}">
                    <tbody>`;
        imgFileList.forEach((file) => {
          let { name, width, alt, rowBgColor, href } = file.data;
          width = (width * edm_width) / kv_width;
          let widthPct = (width / edm_width) * 100;

          if (width === edm_width || temporary_width === 0) {
            edmHTML += `<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                        <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;">
                        <table style="border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: ${rowBgColor};" bgcolor="${rowBgColor}" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">`;
          }

          if (width === edm_width || temporary_width < edm_width) {
            edmHTML += `<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center; width: ${widthPct}%;">
                        ${href && `<a style="line-height: 0;" href="${href}" target="_blank">`}
                        <img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: ${width}px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: 0;line-height: 0;" src="${image_path}${name}" alt="${alt}" width="${width}" align="middle" border="0" />
                        ${href && `</a>`}
                        </td>`;
            temporary_width += width;
            temporary_width = temporary_width === edm_width ? 0 : temporary_width;
          }

          if (width === edm_width || temporary_width === 0) edmHTML += `</tr></tbody></table></td></tr>`;
        });
        edmHTML += `</tbody></table><!-- Email Body : END --><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></div></td></tr></tbody></table>`;
        resolve(edmHTML);
      }
      resolve(null);
    });
  };

  const copyCode = () => {
    if (finalEdmHtml) {
      navigator.clipboard.writeText(finalEdmHtml);
      showAlert("info", "HTML Code Copied!");
    } else showAlert("error", "Failed To Copy HTML Code! Please Generate EDM First");
  };

  const downloadCode = () => {
    console.log(finalEdmHtml);
    if (finalEdmHtml) {
      var element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(finalEdmHtml));
      element.setAttribute("download", "edm.html");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      showAlert("info", "Downloading...");
    } else showAlert("error", "Failed To Download HTML Code! Please Generate EDM First");
  };

  const CustomDivider = ({ title, poaition }) => {
    return poaition === "center" ? (
      <Divider textAlign="center" sx={{ marginBottom: "20px" }}>
        {title}
      </Divider>
    ) : (
      <Divider textAlign="left" sx={{ margin: "20px 0" }}>
        {title}
      </Divider>
    );
  };

  const handleImageUpload = async (e) => {
    const fd = getConfigFormData();
    const assign = (fileList) => {
      return new Promise((resolve) => {
        let imgFileList = [];
        (async () => {
          for (const file of fileList) {
            let name = file.name;
            let imgObjUrl = getObjectURL(file);
            if (imgObjUrl) {
              const { width, height } = await getImgNaturalDimensions(imgObjUrl);
              let displayWidth = ((width * fd.edm_width) / fd.kv_width / fd.edm_width) * 100 + "%";
              imgFileList.push({ ori: file, data: { name, imgObjUrl, width, height, alt: "", rowBgColor: "#ffffff", href: "", displayWidth, id: uuidv4() } });
            }
          }
          resolve(imgFileList);
        })();
      });
    };
    let imgList = await assign(e.target.files);
    if (imgList.length > 0 && fd.edm_width && fd.kv_width && fd.image_path) {
      dispatch({
        type: edmAction.UPDATE_IMG_PREVIEWER,
        payload: { edm_width: fd.edm_width, kv_width: fd.kv_width, image_path: fd.image_path, img_file_list: imgList },
      });
    }
  };

  const getConfigFormData = () => {
    return Object.fromEntries(new FormData(document.getElementById("edmConfigForm")));
  };

  const getObjectURL = (file) => {
    var url = null;
    if (window.createObjectURL !== undefined) {
      url = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  };

  const getImgNaturalDimensions = (imgUrl) => {
    return new Promise((res) => {
      var nImg = new Image();
      nImg.src = imgUrl;
      nImg.onload = () => {
        const { width, height } = nImg;
        res({ width, height });
      };
    });
  };

  const handleOpenConfigImgDialog = (imgObjUrl) => {
    dispatch({ type: edmAction.OPEN_CONFIG_IMG_DIALOG, payload: imgObjUrl });
  };

  return (
    <Paper className="h-full overflow-y-auto p-3 pt-0">
      <Title name="EDM Generation Tool" />
      <TabList />
      <Loading />
      <Alert />
      {/* Tab Container : BEGIN */}
      <TABConfigEdm />
      <TABPreviewEdm />
      {/* Tab Container : END */}
      <ConfigImgDialog />
    </Paper>
  );
};

export default GenEDM;
