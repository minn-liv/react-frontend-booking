import axios from "axios";

const instance = axios.create({
    baseURL:"https://localhost:7109/",
});

instance.interceptors.response.use((response) => {
    const { data } = response;
    return response.data;
});

export default instance;
