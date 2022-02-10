import axios from "axios";

const ciAxios = axios.create({
  baseURL: window.location.origin.includes("localhost")
    ? "http://localhost/emel/"
    : `${window.location.origin}/`,
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default ciAxios;
