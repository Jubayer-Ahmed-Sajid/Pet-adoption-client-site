import useAxiosPublic from './useAxiosPublic';

import { useQuery } from '@tanstack/react-query';

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