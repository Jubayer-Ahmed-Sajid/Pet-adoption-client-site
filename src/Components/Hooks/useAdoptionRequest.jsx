import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdoptionRequest = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
   const {data: adoptionRequests = [], refetch} = useQuery({
    queryKey:['adoption-request'],
    queryFn:async()=>{
     const RequestInfo =await   axiosSecure.get(`/adoption/request?email=${user?.email}`)
     console.log(RequestInfo)
     return RequestInfo.data
    }
})
   return [adoptionRequests,refetch]
};

export default useAdoptionRequest;