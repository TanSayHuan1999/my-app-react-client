import { csmAction } from "../actions/actionTypes";

const initialState = {
  currLanguage: "plaintext",
  showDialog: "",
  loading: false,
};
const csm = (state = initialState, action) => {
  switch (action.type) {
    case csmAction.OPEN_DIALOG:
      return { ...state, showDialog: action.payload };
    case csmAction.CLOSE_DIALOG:
      return { ...state, showDialog: "" };
    case csmAction.UPDATE_CURR_LANG:
      return { ...state, currLanguage: action.payload };
    default:
      return state;
  }
};

export default csm;
