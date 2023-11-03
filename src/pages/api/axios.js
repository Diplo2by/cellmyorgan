import axios from "axios";

export default axios.create({
    baseURL: process.env.VERCEL_URL
});