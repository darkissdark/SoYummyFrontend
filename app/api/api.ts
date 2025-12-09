import axios from "axios";

export const api = axios.create({
  // baseURL: "https://notehub-api.goit.study",
  baseURL: "http://localhost:3001",
  withCredentials: true,
});
