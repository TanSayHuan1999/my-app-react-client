import { csmAction } from "../constants/actionTypes";

const initialState = {
  loading: false,
  currLanguage: "plaintext",
  showDialog: "",
  dialogAction: "",
  queryParams: { type: "", language: "", tags: "", sort: "", sortDir: "", search: "", page: 1, limit: 3 },
  codeSnippetList: [],
  listTotalPages: 0,
  currCodeSnippet: {},
  tags: [],
};
const csm = (state = initialState, action) => {
  switch (action.type) {
    case csmAction.OPEN_DIALOG:
      return { ...state, showDialog: action.payload.dialogName, dialogAction: action.payload.dialogAction };
    case csmAction.START_LOADING:
      return { ...state, loading: true };
    case csmAction.END_LOADING:
      return { ...state, loading: false };
    case csmAction.CLOSE_DIALOG:
      return { ...state, showDialog: "", dialogAction: "", currCodeSnippet: {}, currLanguage: "plaintext" };
    case csmAction.UPDATE_CURR_LANG:
      return { ...state, currLanguage: action.payload };
    case csmAction.UPDATE_CODE_SNIPPET_LIST:
      console.log(action.payload);
      return { ...state, codeSnippetList: action.payload.list, listTotalPages: action.payload.totalPages };
    case csmAction.ADD_CODE_SNIPPET:
      return { ...state, codeSnippetList: [action.payload, ...state.codeSnippetList] };
    case csmAction.VIEW_CODE_SNIPPET:
      return { ...state, showDialog: "view_code_snippet", currCodeSnippet: state.codeSnippetList.find((cs) => cs._id === action.payload) };
    case csmAction.DELETE_CODE_SNIPPET:
      return { ...state, codeSnippetList: state.codeSnippetList.filter((cs) => cs._id !== action.payload) };
    case csmAction.UPDATE_TAGS:
      return { ...state, tags: action.payload };
    case csmAction.UPDATE_SINGLE_CODE_SNIPPET:
      return { ...state, codeSnippetList: state.codeSnippetList.map((cs) => (cs._id === action.payload._id ? action.payload : cs)) };
    case csmAction.CODE_SNIPPET_DETAILS:
      return {
        ...state,
        showDialog: "handle_code_snippet",
        dialogAction: "edit_code_snippet",
        currCodeSnippet: state.codeSnippetList.find((cs) => cs._id === action.payload),
      };
    default:
      return state;
  }
};

export const selectQueryParams = (state) => state.csm.queryParams;
export const selectCodeSnippetList = (state) => state.csm.codeSnippetList;
export const selectListTotalPages = (state) => state.csm.listTotalPages;
export const selectCurrCodeSnippet = (state) => state.csm.currCodeSnippet;
export const selectCurrDialog = (state) => state.csm.showDialog;
export const selectCurrDialogAction = (state) => state.csm.dialogAction;
export const selectTags = (state) => state.csm.tags;
export const selectLoading = (state) => state.csm.loading;

export default csm;
