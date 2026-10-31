import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUserDetails = () => {
    const { user, loading } = useAuth();
    const email = user?.email;
    const axiosPublic = useAxiosPublic();
    
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['user-details', email],
        queryFn: async () => {
            if (!email) return null;
            const res = await axiosPublic.get(`/users/admin/${email}`);
            return res?.data || { name: user?.displayName, email: user?.email, photo_url: user?.photoURL };
        },
        enabled: !loading && !!email,
    });

    return { data, isLoading: loading || isLoading, refetch };
};

export default useUserDetails;
