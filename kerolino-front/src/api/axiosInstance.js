import axios from "axios";

const BASE_URL = "http://localhost:8000";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
    }
});

axiosInstance.interceptors.request.use(
    function (config) {
        if (!config.headers["Authorization"]) {
            config.headers["Authorization"] =
                "Bearer " + localStorage.getItem("token");
            config.headers["withCredentials"] = true;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            // const newAccessToken = await refresh();
            // prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            // return axios(prevRequest);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
