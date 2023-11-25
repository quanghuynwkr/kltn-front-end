import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { getUserInfor, setProfile } from '~/redux/actions/eventAction';

import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const [isRightLogIn, setIsRightLogIn] = useState(true);

    // useEffect(() => {
    //     setLoading(true);

    //     const getApiHome = async () => {
    //         const response = await getHome();
    //         setDataSlide(response.items[0].items);

    //         setDataList(response.items.filter((item) => item.sectionType === 'playlist'));

    //         setLoading(false);
    //         document.title = 'zing-mp3-clone';
    //     };
    //     getApiHome();
    // }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        //Login:
        await axios
            .post(`${process.env.REACT_APP_BASE_URL_API}auth/login`, { email, password })
            .then((response) => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data.access_token));
                    // get access token:
                    axios
                        .get(`${process.env.REACT_APP_BASE_URL_API}profile`, {
                            headers: {
                                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`,
                            },
                        })
                        .then((response) => {
                            dispatch(getUserInfor(response.data.sub));
                            //get infor of user :
                            axios({
                                method: 'get',
                                url: `${process.env.REACT_APP_BASE_URL_API}user/all/${response.data.sub}`,
                            })
                                .then((response) => {
                                    //setData(response.data);
                                    dispatch(setProfile(response.data));
                                    localStorage.setItem('profile', JSON.stringify(response.data));
                    navigate('/home');

                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                setIsRightLogIn(false);
            });

        // axios
        //     .get('${process.env.REACT_APP_BASE_URL_API}profile', {
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem('user')}`,
        //         },
        //     })
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

    return (
        <div className={cx('login', 'flex', 'flex-col', 'justify-center', 'items-center')}>
            <form
                onSubmit={handleLogin}
                action=""
                className={cx(
                    'form',
                    'flex',
                    'flex-col',
                    'sm:w-2/4',
                    'md:w-1/2','md:p-10',
                    'lg:w-1/3','lg:mt-0',
                    '2xl:w-1/4',
                    'p-4',                  
                )}
            >
                <img 
                    className={cx('login-logo'
                        
                    )}
                    src={"https://tuyensinh.ut.edu.vn/wp-content/uploads/2022/07/logo-full.png"}

                           
                />
                <div className={cx('self-center', 'wrapper', 'lg:text-xl', 'md:text-xs', 'text-sm')}>
                    <h1 className={cx('playful')} aria-label="Wash your hands">
                        <span aria-hidden="true">Đ</span>
                        <span aria-hidden="true">Ă</span>
                        <span aria-hidden="true">N</span>
                        <span aria-hidden="true">G </span>
                        <span aria-hidden="true"> </span>
                        <span aria-hidden="true">N</span>
                        <span aria-hidden="true">H</span>
                        <span aria-hidden="true">Ậ</span>
                        <span aria-hidden="true">P</span>
                        <span aria-hidden="true"> </span>
                        <span aria-hidden="true"> </span>

                        <span aria-hidden="true">!</span>
                    </h1>
                </div>

                <div className={cx('form-group', 'flex','text-xl', 'flex-col',)}>
                    <label htmlFor="Email" className={cx('')}>
                        Email:
                    </label>
                    <input
                        type="text"
                        className={cx('form-control', '', 'p-2', '')}
                        name="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex','text-xl', 'flex-col')}>
                    <label htmlFor="Password" className={cx('', '')}>
                        Password:
                    </label>
                    <input
                        type="password"
                        className={cx('form-control', '', 'p-2', '')}
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isRightLogIn ? <span className={cx('text-red-600')}>Mật khẩu hoặc email không đúng</span> : ''}
                </div>
                <div className={cx('form-group', 'self-center')}>
                    <Button className={cx('btn', 'rounded-md')}>ĐĂNG NHẬP</Button>
                </div>
            </form>
        </div>
    );
};

export default memo(Login);
