export const EdmConfigInputs = {
  general: [
    { name: "edm_width", label: "EDM Width", type: "text" },
    { name: "kv_width", label: "KV Width", type: "text" },
    { name: "table_bgcolor", label: "Table Background", type: "color" },
    {
      name: "language_switching",
      label: "Language Switching",
      type: "select",
      options: [
        { label: "Chinese (Simplified)", value: "zh-CN" },
        { label: "Chinese (Traditional)", value: "zh-HK" },
        { label: "English", value: "en-US" },
      ],
    },
    { name: "image_path", label: "Image Path", type: "text" },
    { name: "font_color", label: "Font Color", type: "color" },
    { name: "image_link", label: "Image Link", type: "text" },
    { name: "pre_header", label: "Pre-Header", type: "text" },
    {
      name: "type_switching",
      label: "Type Switching",
      type: "select",
      options: [
        { label: "Whole Edm", value: "whole-edm" },
        { label: "ALT Whole Edm", value: "alt-whole-edm" },
      ],
    },
  ],
  switch: [
    { name: "multi_language", label: "Multi Language" },
    { name: "footer_area", label: "Footer Area" },
    { name: "browser_preview", label: "Browser Preview" },
    { name: "load_script", label: "Load Script" },
  ],
};

export const EdmStyles = `
html,body{margin:0 !important;padding:0 !important;width:100% !important;}
a{color:#888888;text-decoration:none;}
*{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}
div[style*="margin:16px 0"]{margin:0 !important;}
table,td{mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;}
table{border-spacing:0 !important;border-collapse:collapse !important;table-layout:fixed !important;margin:0 auto !important;}
table table table{table-layout:auto;}
img{-ms-interpolation-mode:bicubic;display:block;border:0;margin:auto}
.main{width:800px !important;}.boxh{height:236px}
.btn-link a{color:#FFFFFF !important;transition:all 100ms ease-in;}
.btn-link a:hover{background:#333333 !important;border-color:#333333 !important;color:#ffffff !important}
.web{display:block!important}
.mobile{display:none !important}
@media screen and (max-width:660px){
.main{width:100% !important;}
.stack-column,.stack-column-center{display:block !important;width:100% !important;max-width:100% !important;direction:ltr !important;height:auto !important;padding:0px !important;}
.stack-column-center{text-align:center !important;height:auto !important;padding:0px !important;padding-bottom:20px!important}
.center-on-narrow{text-align:center !important;display:block !important;margin-left:auto !important;margin-right:auto !important;float:none !important;}
table.center-on-narrow{display:inline-block !important;}
.templateContainer{width:100%!important}
.templateColumn{width:100%!important}
.web{display:none!important}
.mobile{display:block !important}
.boxh{height:auto !important;}
}`;
