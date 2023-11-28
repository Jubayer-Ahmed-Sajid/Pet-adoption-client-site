import {useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useDonations = () => {
   const axiosPublic = useAxiosPublic()
   const {data: donations=[],refetch} = useQuery({
    queryKey:['donations'],
    queryFn:async()=>{
      const donationsRes =await  axiosPublic.get('/donations')
      return donationsRes.data
    }
   })
   return [donations,refetch]
};

export default useDonations;