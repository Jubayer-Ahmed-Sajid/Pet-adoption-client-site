import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePetDetails = (id) => {
    const axiosPublic = useAxiosPublic()
    const { data: PetDetails = {} } = useQuery({
        queryKey: ['pet-details'],
        queryFn: async () => {
            const res = await axiosPublic.get(`pets/${id}`)
            return res.data
        }
    })
    console.log(PetDetails)
    return { PetDetails }
};

export default usePetDetails;