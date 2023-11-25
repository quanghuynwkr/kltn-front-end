import { get } from '~/utils/httpRequest';

const getTop100 = async () => {
    try {
        const res = await get('/top100');

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getTop100;
