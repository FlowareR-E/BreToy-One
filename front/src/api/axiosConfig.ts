import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:9090/api",
    timeout: 5000,
    headers:{
        'Content-Type': 'application/json',
    },
})

 apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("API error:", error);
        return Promise.reject(error.response?.data || error.message);
    }
 );


export default apiClient;