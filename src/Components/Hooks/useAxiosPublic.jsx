import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-adaption-server-side.vercel.app',
    withCredentials: true,
})
const useAxiosPublic = () => {
    return axiosPublic
}
export default useAxiosPublic
