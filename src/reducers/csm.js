import { csmAction } from "../constants/actionTypes";

const initialState = {
  currLanguage: "plaintext",
  showDialog: "",
  loading: false,
  queryParams: {
    type: "",
    language: "",
    tags: "",
    sort: "",
    sortDir: "",
    search: "",
    page: 1,
    limit: 3,
  },
  codeSnippetList: [],
  currCodeSnippet: {},
  tags: [],
};
const csm = (state = initialState, action) => {
  switch (action.type) {
    case csmAction.OPEN_DIALOG:
      return { ...state, showDialog: action.payload };
    case csmAction.CLOSE_DIALOG:
      return { ...state, showDialog: "" };
    case csmAction.UPDATE_CURR_LANG:
      return { ...state, currLanguage: action.payload };
    case csmAction.UPDATE_CODE_SNIPPET_LIST:
      return { ...state, codeSnippetList: action.payload };
    case csmAction.ADD_CODE_SNIPPET:
      return { ...state, codeSnippetList: [action.payload, ...state.codeSnippetList] };
    case csmAction.VIEW_CODE_SNIPPET:
      return { ...state, showDialog: "view_code_snippet", currCodeSnippet: state.codeSnippetList.find((cs) => cs._id === action.payload) };
    case csmAction.DELETE_CODE_SNIPPET:
      return { ...state, codeSnippetList: state.codeSnippetList.filter((cs) => cs._id !== action.payload) };
    case csmAction.UPDATE_TAGS:
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export const selectQueryParams = (state) => state.csm.queryParams;
export const selectCodeSnippetList = (state) => state.csm.codeSnippetList;
export const selectCurrCodeSnippet = (state) => state.csm.currCodeSnippet;
export const selectCurrDialog = (state) => state.csm.showDialog;
export const selectTags = (state) => state.csm.tags;

export default csm;
