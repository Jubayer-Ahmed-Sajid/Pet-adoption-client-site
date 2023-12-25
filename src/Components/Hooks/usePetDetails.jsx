import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePetDetails = (id) => {
    const axiosPublic = useAxiosPublic()
    const { data: PetDetails = {} } = useQuery({
        queryKey: ['pet-details'],
        queryFn: async () => {
            const res = await axiosPublic.get(`pets/id/${id}`)
            return res.data
        }
    })

    return { PetDetails }
};

export default usePetDetails;