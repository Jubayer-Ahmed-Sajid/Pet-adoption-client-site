import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-adaption-server-side-2se7bf2bn-jubayer-ahmed-sajid.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
}
export default useAxiosPublic
