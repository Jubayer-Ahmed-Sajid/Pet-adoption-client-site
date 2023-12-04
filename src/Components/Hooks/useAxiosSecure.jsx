import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
 baseURL:'https://pet-adaption-server-side-fgi0jtdj5-jubayer-ahmed-sajid.vercel.app'
});
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {SignOutUser} = useAuth()
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('interceptor is heated', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    },
    function(error){
        return Promise.reject(error)
    });
    axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, async (error)=> {
        const status = error?.response?.status
        console.log(status)
        if(status == 401 || status == 403)
        {
         SignOutUser(); 
            navigate('/signin')
        }
        return Promise.reject(error);
      });
      return axiosSecure;
};

export default useAxiosSecure;