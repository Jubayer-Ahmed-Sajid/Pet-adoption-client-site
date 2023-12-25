import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useEvents = () => {
    const aadfld = useAxiosPublic()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    
    const { data: events = [], refetch } = useQuery({
        queryKey: ['events', user?.email],  
        queryFn: async () => {
            const favPets = await axiosPublic.get(`/pet/special/events`)
            return favPets.data
        }
    })

    console.log(events)
    return [events, refetch]
};

export default useEvents;
