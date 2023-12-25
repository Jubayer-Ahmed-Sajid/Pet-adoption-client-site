import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useFavorites = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    
    const { data: favorites = [], refetch } = useQuery({
        queryKey: ['favorites', user?.email],  
        queryFn: async () => {
            const favPets = await axiosSecure.get(`/pets/favorites/email?email=${user?.email}`)
            return favPets.data
        }
    })

    console.log(favorites)
    return [favorites, refetch]
};

export default useFavorites;
