import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import { space } from 'postcss/lib/list';
import useAxiosPublic from './useAxiosPublic';

const useAddedPets = () => {
   const {user,isLoading} = useAuth()
   if(isLoading){
      return <span>Loading...</span>
   }
   console.log(user)
   const axiosPublic = useAxiosPublic()
   const {data: addedPets=[],refetch} =useQuery({
      queryKey:['added-pets'],
      queryFn:async()=>{
         const addedPets = await axiosPublic.get(`/addedpets?email=${user?.email}`);
         return addedPets.data
      }
   })
   return [addedPets,refetch]

};

export default useAddedPets;