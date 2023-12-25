import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useFavorites = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    
    const { data: favorites = [], refetch } = useQuery({
        queryKey: ['favorites', user?.email],  
        queryFn: async () => {
            const favPets = await axiosPublic.get(`/pets/favorites/email?email=${user?.email}`)
            return favPets.data
        }
    })

    console.log(favorites)
    return [favorites, refetch]
};

export default useFavorites;
