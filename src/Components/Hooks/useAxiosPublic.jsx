import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-adaption-server-side-81hzpcy3n-jubayer-ahmed-sajid.vercel.app',
    withCredentials: true,
})
const useAxiosPublic = () => {
    return axiosPublic
}
export default useAxiosPublic
