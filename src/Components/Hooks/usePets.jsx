import {  useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const usePets = () => {
    const axiosSecure = useAxiosSecure()
    const {data: pets=[],refetch,fetchNextPage,hasNextPage} = useQuery(
        {
            queryKey:['all-pets'],
            queryFn: async()=>{
               const res =await axiosSecure.get('/pets')
               return res.data
            }
            // getNextPageParam:(lastPage)=>{
            //     if(lastPage.prevOffset + 9 > lastPage.petsCount){
            //         return false
            //     }
            //     return lastPage.prevOffset + 10;
            // }
        }
        )
        console.log(pets)
        // const allPets = pets.pages.reduce((acc,page)=>{
        //     return[...acc, ...page.allPets]
        // },[])
       
        return [pets,refetch]
    };

export default usePets;