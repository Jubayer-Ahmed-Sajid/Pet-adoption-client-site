import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDonationDetails = (id) => {
    const axiosPublic = useAxiosPublic()
    const { data: donationDetails = {} } = useQuery({
        queryKey: ['pet-details'],
        queryFn: async () => {
            const res = await axiosPublic.get(`donations/${id}`)
            return res.data
        }
    })

    return { donationDetails }
};

export default useDonationDetails;