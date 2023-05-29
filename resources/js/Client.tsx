import axios from "axios";

const Client = axios.create({
    baseURL: "localhost:8000",
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

export default Client;
