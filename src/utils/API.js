import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL, timeout: process.env.REACT_APP_API_TIMEOUT });

export default API;
