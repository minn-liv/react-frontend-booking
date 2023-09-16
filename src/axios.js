import axios from "axios";

const instance = axios.create({
    baseURL: "https://localhost:7109",
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            if (response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } catch (e) {
            console.error(e);
        }
        throw error;
    }
);

export default instance;
