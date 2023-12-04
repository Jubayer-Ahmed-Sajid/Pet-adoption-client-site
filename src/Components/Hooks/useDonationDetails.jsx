import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDonationDetails = (id) => {
    const axiosSecure = useAxiosSecure()
    const { data: donationDetails = {} } = useQuery({
        queryKey: ['pet-details'],
        queryFn: async () => {
            const res = await axiosSecure.get(`donations/${id}`)
            return res.data
        }
    })

    return { donationDetails }
};

export default useDonationDetails;