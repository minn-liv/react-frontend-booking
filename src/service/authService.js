import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("/login", {
        email: userEmail,
        password: userPassword,
    });
};

export { handleLoginApi };
