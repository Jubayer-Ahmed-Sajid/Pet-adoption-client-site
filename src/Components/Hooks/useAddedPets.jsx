import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAddedPets = () => {
   const { user, loading } = useAuth();
   const axiosPublic = useAxiosPublic();

   const { data: addedPets = [], refetch, isLoading } = useQuery({
      queryKey: ['added-pets', user?.email],
      queryFn: async () => {
         if (!user?.email) return [];
         const res = await axiosPublic.get(`/addedpets?email=${user.email}`);
         return res.data;
      },
      enabled: !loading && !!user?.email,
   });

   return [addedPets, refetch, isLoading || loading];
};

export default useAddedPets;
