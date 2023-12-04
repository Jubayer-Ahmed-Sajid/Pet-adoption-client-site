
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch,isLoading,isError } = useQuery({
        queryKey: ['every-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    return [users, refetch,isLoading,isError]
};

export default useUsers;