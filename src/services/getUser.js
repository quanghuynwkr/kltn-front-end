import { get } from '~/utils/httpRequest';

const getUser = async (userId) => {
    try {
        const res = await get(`user/${userId}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};
export default getUser;
