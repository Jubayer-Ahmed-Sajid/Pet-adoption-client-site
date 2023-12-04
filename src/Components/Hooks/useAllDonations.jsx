import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAddedDonations = () => {
    const axiosSecure = useAxiosSecure()
    const {data: allDonations=[], refetch} =useQuery({
        queryKey:['added-donations'],
        queryFn:async()=>{
            const donationRes = await axiosSecure.get('/donations')
            return donationRes.data
        }
        
    
    })
    return [allDonations,refetch]
};

export default useAddedDonations;