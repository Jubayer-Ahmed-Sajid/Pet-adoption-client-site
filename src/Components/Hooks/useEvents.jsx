import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useEvents = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    
    const { data: events = [], refetch } = useQuery({
        queryKey: ['events', user?.email],  
        queryFn: async () => {
            const favPets = await axiosSecure.get(`/pet/special/events`)
            return favPets.data
        }
    })

    console.log(events)
    return [events, refetch]
};

export default useEvents;
