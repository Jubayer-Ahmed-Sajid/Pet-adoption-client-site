import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import { space } from 'postcss/lib/list';
import useAxiosSecure from './useAxiosSecure';

const useAddedPets = () => {
   const {user,isLoading} = useAuth()
   if(isLoading){
      return <span>Loading...</span>
   }
   console.log(user)
   const axiosSecure = useAxiosSecure()
   const {data: addedPets=[],refetch} =useQuery({
      queryKey:['added-pets'],
      queryFn:async()=>{
         const addedPets = await axiosSecure.get(`/addedpets?email=${user?.email}`);
         return addedPets.data
      }
   })
   return [addedPets,refetch]

};

export default useAddedPets;