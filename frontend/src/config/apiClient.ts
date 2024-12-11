import axios, {AxiosResponse} from "axios";
import { navigate } from "./navigation";
import { UNAUTHORIZED } from "../constants/http";


const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};


const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => {console.log(response);
   return response.data},
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === UNAUTHORIZED && data?.errorCode === "InvalidAccessToken") {
      try {

        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(config);
      } catch {
        if (navigate) {

          navigate("/login", {
            state: {
              redirectUrl: window.location.pathname,
            },
          });
        }
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export default API;