import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const instance = axios.create({
    baseURL: baseURL,
});
const onError = () => {
    return "Error"
}
const onSuccess = (response: any) => {
    return response.data;
}

instance.interceptors.response.use(onSuccess, onError);
instance.interceptors.request.use((opt) => {
    // if (token) opt.headers.Authorization = "Bearer " + token;
    return opt;
})

export default instance