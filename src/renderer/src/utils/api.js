import axios from "axios";

const API = axios.create({
    baseURL: 'https://trabalho-api.onrender.com/',
    timeout: 50000
});

export default API;