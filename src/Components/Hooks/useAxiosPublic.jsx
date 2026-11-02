import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://pet-adaption-server-side.vercel.app"
    : "http://localhost:5000");

const axiosPublic = axios.create({
  baseURL,
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
