import { edmAction } from "../constants/actionTypes";

const initialState = {
  input: {
    edm_width: 700,
    kv_width: 700,
    image_path: "https://imgsrv1.mailer08.net/images/dGVuYW50MjA4YWRtaW4_/WTJGdGNHRnBaMjVmTXpFMA/",
  },
  showContainer: {
    footer_area: false,
    browser_preview: false,
    load_script: false,
  },
  configImgDialog: {
    open: false,
    setting: {
      rowBgColor: "#ffffff",
      href: "",
      alt: "",
      imgObjUrl: "",
    },
  },
  imgPreviewer: {
    img_file_list: [],
    edm_width: 800,
    kv_width: 800,
    image_path: "",
  },
  loading: false,
};
const edm = (state = initialState, action) => {
  switch (action.type) {
    case edmAction.UPDATE_INPUT:
      return { ...state, input: { ...state.input, [action.payload.name]: action.payload.value } };
    case edmAction.HANDLE_CONTAINER:
      return { ...state, showContainer: { ...state.showContainer, [action.payload.name]: action.payload.value } };
    case edmAction.CONFIRM_CONFIG_IMG_DIALOG:
      return {
        ...state,
        configImgDialog: { ...state.configImgDialog, open: false, setting: { rowBgColor: "#ffffff", href: "", alt: "", imgObjUrl: "" } },
        imgPreviewer: {
          ...state.imgPreviewer,
          img_file_list: state.imgPreviewer.img_file_list.map((img) =>
            img.data.imgObjUrl === state.configImgDialog.setting.imgObjUrl
              ? {
                  ...img,
                  data: {
                    ...img.data,
                    rowBgColor: state.configImgDialog.setting.rowBgColor,
                    href: state.configImgDialog.setting.href,
                    alt: state.configImgDialog.setting.alt,
                  },
                }
              : img
          ),
        },
      };
    case edmAction.CLOSE_CONFIG_IMG_DIALOG:
      return {
        ...state,
        configImgDialog: { ...state.configImgDialog, open: false, setting: { rowBgColor: "#ffffff", href: "", alt: "", imgObjUrl: "" } },
      };
    case edmAction.OPEN_CONFIG_IMG_DIALOG:
      let targetImg = state.imgPreviewer.img_file_list.find((img) => img.data.imgObjUrl === action.payload);
      return {
        ...state,
        configImgDialog: {
          ...state.configImgDialog,
          open: true,
          setting: { rowBgColor: targetImg.data.rowBgColor, href: targetImg.data.href, alt: targetImg.data.alt, imgObjUrl: action.payload },
        },
      };
    case edmAction.UPDATE_DIALOG_INPUT:
      return {
        ...state,
        configImgDialog: { ...state.configImgDialog, setting: { ...state.configImgDialog.setting, [action.payload.name]: action.payload.value } },
      };
    case edmAction.UPDATE_IMG_PREVIEWER_INPUT:
      return {
        ...state,
        imgPreviewer: { ...state.imgPreviewer, [action.payload.name]: action.payload.value },
      };
    case edmAction.UPDATE_IMG_PREVIEWER:
      return {
        ...state,
        imgPreviewer: {
          img_file_list: action.payload.img_file_list,
          edm_width: action.payload.edm_width,
          kv_width: action.payload.kv_width,
          image_path: action.payload.image_path,
        },
      };
    case edmAction.START_LOADING:
      return { ...state, loading: true };
    case edmAction.END_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default edm;
