import React from 'react';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAddedPets = () => {
   const {user} = useAuth()
   const axiosPublic = useAxiosPublic()
   const {data,refetch} =useQuery({
      queryKey:['added-pets'],
      queryFn:async()=>{
         const addedPets = await axiosPublic.get(`{/addedpets?email=${user?.email}}`)
         console.log(addedPets.data)
         return addedPets.data
      }
   })
   return [data,refetch]

};

export default useAddedPets;