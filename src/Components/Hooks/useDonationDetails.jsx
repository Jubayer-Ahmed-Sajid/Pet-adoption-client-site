import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDonationDetails = (id) => {
    const axiosPublic = useAxiosPublic();
    const { data: donationDetails = {}, refetch, isLoading } = useQuery({
        queryKey: ['donation-details', id],
        queryFn: async () => {
            if (!id) return {};
            const res = await axiosPublic.get(`/donations/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    return [donationDetails, refetch, isLoading];
};

export default useDonationDetails;
