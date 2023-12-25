import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useAdoptionRequest = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
   const {data: adoptionRequests = [], refetch} = useQuery({
    queryKey:['adoption-request'],
    queryFn:async()=>{
     const RequestInfo =await   axiosPublic.get(`/adoption/request?email=${user?.email}`)
     console.log(RequestInfo)
     return RequestInfo.data
    }
})
   return [adoptionRequests,refetch]
};

export default useAdoptionRequest;