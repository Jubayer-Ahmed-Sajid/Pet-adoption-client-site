import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePetDetails = (id) => {
    const axiosPublic = useAxiosPublic();
    const { data: PetDetails = {}, isLoading, refetch } = useQuery({
        queryKey: ['pet-details', id],
        queryFn: async () => {
            if (!id) return {};
            const res = await axiosPublic.get(`/pets/id/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    return { PetDetails, isLoading, refetch };
};

export default usePetDetails;
