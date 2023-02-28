import API from "../utils/API";

const prefix = process.env.REACT_APP_CODE_SNIPPET_ROUTE_PREFIX;
export const codeSnippetList = (query) => API.post(`${prefix}/list`, query);
export const codeSnippetAdd = (codeSnippet) => API.post(`${prefix}/add`, codeSnippet);
export const codeSnippetEdit = (id, updatedCodeSnippet) => API.patch(`${prefix}/edit/${id}`, updatedCodeSnippet);
export const codeSnippetDetail = (id) => API.get(`${prefix}/details/${id}`);
export const codeSnippetDelete = (id) => API.delete(`${prefix}/delete/${id}`);
export const getTags = () => API.get(`${prefix}/get-tags`);
