import * as api from "../api/codeSnippets";
import { csmAction } from "../constants/actionTypes";

export const codeSnippetList = (queryParams) => async (dispatch) => {
  try {
    const res = await api.codeSnippetList(queryParams);
    if (res.status === 200 && res.data.success) {
      dispatch({ type: csmAction.UPDATE_CODE_SNIPPET_LIST, payload: res.data });
    }
  } catch (error) {
    console.error(error);
  }
};

export const codeSnippetAdd = (newCodeSnippet) => async (dispatch) => {
  try {
    const res = await api.codeSnippetAdd(newCodeSnippet);
    if (res.status === 200 && res.data.success) {
      dispatch({ type: csmAction.ADD_CODE_SNIPPET, payload: res.data.codeSnippet });
      dispatch({ type: csmAction.CLOSE_DIALOG });
    }
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export const codeSnippetEdit = (id, updatedCodeSnippet) => async (dispatch) => {
  try {
    const res = await api.codeSnippetEdit(id, updatedCodeSnippet);
    if (res.status === 200 && res.data.success) {
      dispatch({ type: csmAction.UPDATE_SINGLE_CODE_SNIPPET, payload: res.data.updatedCodeSnippet });
      dispatch({ type: csmAction.CLOSE_DIALOG });
    }
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export const codeSnippetDetail = (id) => async (dispatch) => {};

export const codeSnippetDelete = (id) => async (dispatch) => {
  try {
    const res = await api.codeSnippetDelete(id);
    if (res.status === 200 && res.data.success) {
      dispatch({ type: csmAction.DELETE_CODE_SNIPPET, payload: id });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTags = () => async (dispatch) => {
  try {
    const res = await api.getTags();
    if (res.status === 200 && res.data.success) {
      dispatch({ type: csmAction.UPDATE_TAGS, payload: res.data.tags });
    }
  } catch (error) {
    console.error(error);
  }
};
