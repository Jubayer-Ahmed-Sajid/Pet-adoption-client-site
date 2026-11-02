import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://pet-adaption-server-side.vercel.app"
    : "http://localhost:5000");

const axiosSecure = axios.create({
  baseURL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { SignOutUser } = useAuth();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        SignOutUser();
        navigate("/signin");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
