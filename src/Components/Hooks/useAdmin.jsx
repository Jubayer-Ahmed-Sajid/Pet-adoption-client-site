
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const {user} = useAuth()
  
  const axiosPublic = useAxiosPublic()
  const {data,isLoading} = useQuery({
    queryKey:[user?.email,'admin'],
    queryFn: async()=>{
       const res =await  axiosPublic.get(`/users/admin/${user?.email}`)
            console.log(res.data)
            return res.data.isAdmin
    },
    
  })
  
  return [data,isLoading]
};

export default useAdmin;