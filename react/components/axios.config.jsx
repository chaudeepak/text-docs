import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    //instead of calling in every page where required,
    //we create axiosInstance at one file
    // baseURL: "https://localhost:3005/api/",

    // npx
    // baseURL: process.env.REACT_APP_API_URL,

    // vite 
    baseURL: import.meta.env.VITE_API_URL,
    //response time in milliseconds
    timeout: 30000,
    timeoutErrorMessage: "Server time out ....",
    //this is default header
    header: {
        "Accept": "application/json",               //serrver bata clint ma content kasto paune
        "Content-Type": "application/json",         //pathauda kasto header pathaune (default)

    }
})

axiosInstance.interceptors.response.use(
    (success) => {
        return success;
    },
    (reject) => {
        console.log(reject)
        //Handle Error 
        if(reject.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem('user')
            //API Call for refresh token
            localStorage.removeItem("refreshToken")
            toast.error("Please login first")
            window.location.href = "/login";
        }
        throw reject?.response;
    }
)

export default axiosInstance;