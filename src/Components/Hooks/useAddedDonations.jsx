import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAddedDonations = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: addedDonations=[], refetch} =useQuery({
        queryKey:['added-donations'],
        queryFn:async()=>{
            const donationRes = await axiosSecure.get(`/addeddonations?email=${user?.email}`)
            return donationRes.data
        }
        
    
    })
    return [addedDonations,refetch]
};

export default useAddedDonations;