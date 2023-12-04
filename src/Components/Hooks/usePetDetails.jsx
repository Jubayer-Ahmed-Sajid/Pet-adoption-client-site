import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePetDetails = (id) => {
    const axiosSecure = useAxiosSecure()
    const { data: PetDetails = {} } = useQuery({
        queryKey: ['pet-details'],
        queryFn: async () => {
            const res = await axiosSecure.get(`pets/${id}`)
            return res.data
        }
    })

    return { PetDetails }
};

export default usePetDetails;