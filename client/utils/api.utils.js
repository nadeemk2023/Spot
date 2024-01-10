import axios from "axios";
import { toast } from "react-toastify";
import { API_TARGET, API_URL } from "../constants.js";

const getUserToken = () => {
  const savedUser = JSON.parse(localStorage.getItem("MernAppUser"));
  return savedUser ? savedUser.token : "";
};

const api = axios.create({
  baseURL: `${API_TARGET}/${API_URL}`,
//   baseURL:
//     import.meta.env.VITE_NODE_ENV === "production"
//       ? `${API_TARGET}/${API_URL}`
//       : "http://localhost:3001/api",
 });

api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.common["Authorization"] = getUserToken();

api.interceptors.request.use(
  function (config) {
    const token = getUserToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 && error.response.data.error) {
      toast.error(error.response.data.error);
    } else if (error.response.status === 401) {
      toast.error("Unauthorized");
      console.log(error.response.data.error);
    }
    if (error.response.status === 500) {
      toast.error("500 Server Error");
    }
    return Promise.reject(error);
  }
);

export default api;
