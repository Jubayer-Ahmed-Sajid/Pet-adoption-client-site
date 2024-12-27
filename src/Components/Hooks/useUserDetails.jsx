import React from 'react';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUserDetails = () => {
    const {user,loading} = useAuth();
    if(loading){
        return <h2>Loading...</h2>
    }
   
    const email = user?.email;
    const axiosPublic = useAxiosPublic();
    const {data,isLoading,refetch} = useQuery({
        queryKey:[email],
        queryFn:async()=>{
            const res =await axiosPublic.get(`/user/${email}`)
            return res?.data;
        }
    })
    return {data,isLoading,refetch};
};

export default useUserDetails;