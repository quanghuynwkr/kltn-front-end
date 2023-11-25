import axios from 'axios';

const userService = {
    getID: async () => {
        await axios
            .get('https://finalgraduate-nestjs.vercel.appprofile', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`,
                },
            })
            .then((response) => {
                return response.data.sub;
            })
            .catch((error) => {
                console.error(error);
            });
    },
    getUserInformations: (id) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL_API}user/${id}`,
        }).then(function (response) {
            return response.data;
        });
    },
};

export default userService;
