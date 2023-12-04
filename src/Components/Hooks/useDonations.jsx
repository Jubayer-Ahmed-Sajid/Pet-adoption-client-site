import {useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useDonations = () => {
   const axiosSecure = useAxiosSecure()
   const {data: donations=[],refetch} = useQuery({
    queryKey:['donations'],
    queryFn:async()=>{
      const donationsRes =await  axiosSecure.get('/donations')
      return donationsRes.data
    }
   })
   return [donations,refetch]
};

export default useDonations;