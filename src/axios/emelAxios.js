import axios from "axios";

const emelAxios = axios.create({
  baseURL: "https://api.emel.com.pl/",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Accept: "application/json",
    "Cache-Control": "no-cache",
  },
});

export default emelAxios;
