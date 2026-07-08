import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-assistant-bot-p8ye.onrender.com",
});

export default api;