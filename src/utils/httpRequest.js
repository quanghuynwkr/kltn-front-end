import axios from 'axios';

const httpRequest = axios.create({
    baseURL: '${process.env.REACT_APP_BASE_URL_API}',
});

export const get = async (path) => {
    const response = await httpRequest.get(path);
    return response.data;
};

export default httpRequest;
