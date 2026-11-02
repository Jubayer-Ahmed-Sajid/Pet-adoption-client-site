import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePlatformStats = () => {
  const axiosPublic = useAxiosPublic();
  const { data: stats = {
    totalAvailable: 12,
    totalRehomed: 0,
    totalRaised: 6775,
    categories: { dog: 5, cat: 3, bird: 2, fish: 2 },
  }, isLoading, refetch } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/stats");
        return res.data;
      } catch (err) {
        return {
          totalAvailable: 12,
          totalRehomed: 0,
          totalRaised: 6775,
          categories: { dog: 5, cat: 3, bird: 2, fish: 2 },
        };
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  return { stats, isLoading, refetch };
};

export default usePlatformStats;

