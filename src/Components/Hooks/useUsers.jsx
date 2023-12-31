
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useUsers = () => {
    const axiosPublic = useAxiosPublic()
    const { data: users = [], refetch,isLoading,isError } = useQuery({
        queryKey: ['every-users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data
        }
    })
    return [users, refetch,isLoading,isError]
};

export default useUsers;