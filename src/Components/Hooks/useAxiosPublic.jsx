import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: 'https://pet-adaption-server-side-jubayer-ahmed-sajid.vercel.app',
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})
const useAxiosPublic = () => {
    return axiosPublic
}
export default useAxiosPublic
