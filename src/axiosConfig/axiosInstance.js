import axios from "axios";
const API_KEY = "83c3a5afb1df4340869bc184145f4627";

export const cancelReq= axios.CancelToken.source();
const axiosInstance = axios.create({
    baseURL: "https://api.rawg.io/api",
    params:{
        key:API_KEY,
    }
});

export default axiosInstance;