import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAddedDonations = () => {
    const axiosPublic = useAxiosPublic()
    const {data: allDonations=[], refetch} =useQuery({
        queryKey:['added-donations'],
        queryFn:async()=>{
            const donationRes = await axiosPublic.get('/donations')
            return donationRes.data
        }
        
    
    })
    return [allDonations,refetch]
};

export default useAddedDonations;