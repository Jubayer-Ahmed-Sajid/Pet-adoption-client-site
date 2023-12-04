
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const {user} = useAuth()
  
  const axiosSecure = useAxiosSecure()
  const {data,isLoading} = useQuery({
    queryKey:[user?.email,'admin'],
    queryFn: async()=>{
       const res =await  axiosSecure.get(`/users/admin/${user?.email}`)
            console.log(res.data)
            return res.data.isAdmin
    },
    
  })
  
  return [data,isLoading]
};

export default useAdmin;