import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN as string;

const axiosClient = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: "https://api.twitter.com/2",
        withCredentials: true,
        headers: {
            Accept: "application/json",
            Authorization: BEARER_TOKEN ? `Bearer ${BEARER_TOKEN}` : "EMPTY",
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    return instance;
};

export default axiosClient;
