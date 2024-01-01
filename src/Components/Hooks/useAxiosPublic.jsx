import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-adaption-server-side-rdvp9zht8-jubayer-ahmed-sajid.vercel.app',
    withCredentials: true,
})
const useAxiosPublic = () => {
    return axiosPublic
}
export default useAxiosPublic
