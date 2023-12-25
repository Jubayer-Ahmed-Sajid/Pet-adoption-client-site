import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAddedDonations = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const {data: addedDonations=[], refetch} =useQuery({
        queryKey:['added-donations'],
        queryFn:async()=>{
            const donationRes = await axiosPublic.get(`/addeddonations?email=${user?.email}`)
            return donationRes.data
        }
        
    
    })
    return [addedDonations,refetch]
};

export default useAddedDonations;