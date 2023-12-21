import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5173/', 
    withCredentials: true
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;