import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-adaption-server-side-9tfe08p64-jubayer-ahmed-sajid.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
}
export default useAxiosPublic
