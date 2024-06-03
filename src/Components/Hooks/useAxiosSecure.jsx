import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';


const axiosSecure = axios.create({
  // baseURL: "https://pet-adaption-server-side-jubayer-ahmed-sajid.vercel.app",
  baseURL:"http://localhost:5000",
  withCredentials: true, // Send cookies with requests
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { SignOutUser } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim());
        
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
        navigate('/Signin');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;