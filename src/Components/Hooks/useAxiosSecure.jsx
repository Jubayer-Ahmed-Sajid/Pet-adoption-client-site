import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
 baseURL:'http://localhost5000.com'
});
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {signOutUser} = useAuth()
    axios.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('interceptor is heated', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    },
    function(error){
        return Promise.reject(error)
    });
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, async (error)=> {
        const status = error?.response?.status
        console.log(status)
        if(status == 401 || status == 403)
        {
            await(signOutUser) 
            navigate('/singin')
        }
        return Promise.reject(error);
      });
      return axiosSecure;
};

export default useAxiosSecure;