import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-adaption-server-side-1w2fswoam-jubayer-ahmed-sajid.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
}
export default useAxiosPublic
