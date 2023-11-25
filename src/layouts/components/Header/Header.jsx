import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
    //const showSideBar = useSelector((state) => state.allMusics.isShowSideBar);
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const profile = JSON.parse(localStorage.getItem('profile'));
    

    return (
        <header className={cx('header', ['flex', 'items-center', 'justify-between', 'p-4', 'h-30'])}>
            <img
                onClick={() => {
                    if (pathname === '/' || pathname === '/register') {
                        navigate('/');
                    }
                    navigate('/home');
                }}
                className={cx('image', [
                    'object-contain',
                    'object-center',
                    'w-32',
                    'h-3w-32',
                    'justify-center',
                    'items-center',
                ])}
                src={"https://ptc.ut.edu.vn/wp-content/uploads/2023/02/uth_logo_2.png"}     //Header logo
                alt="Logo?"
            />
            <div className={cx('header_title')}> 
                TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI TP.HỒ CHÍ MINH
                <br></br> KHOA ĐIỆN - ĐIỆN TỬ VIỄN THÔNG
            </div>
            <div className={cx('button-or-avatar')}>
                {!(pathname === '/' || pathname === '/register') ? (
                    <div className={cx('avatar-log-out', 'flex', 'items-center')}>
                        {/* <FontAwesomeIcon
                            onClick={() => {
                                navigate('/profile');
                            }}
                            icon={faAddressCard}
                            className={cx('avatar', ['md:text-3xl', 'lg:text-5xl', 'text-gray-300', 'mr-5'])}
                        /> */}
                        <img src={profile.avatarUrl ?profile.avatarUrl: 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'} alt="avatar"  className={cx('avatar', [, 'mr-5' , 'rounded'])}  onClick={() => {
                                navigate('/profile');
                            }} />
                        <FontAwesomeIcon
                            onClick={() => {
                                //sau 1 ngày thì xóa data người dùng
                                navigate('/');
                              
                                    localStorage.removeItem('user');
                                    localStorage.removeItem('profile');
                                

                            }}
                            icon={faRightToBracket}
                            className={cx('log-out', ['md:text-3xl', 'lg:text-2xl', 'text-gray-300'])}
                        />
                    </div>
                ) : pathname === '/' ? (
                    <Button
                        onClick={() => {
                            navigate('/register');
                        }}
                        className={cx('btn', 'py-5', 'px-10', 'rounded-lg')}
                    >
                        SIGN UP
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            navigate('/');
                        }}
                        className={cx('btn', 'py-5', 'px-10', 'rounded-lg')}
                    >
                        LOG IN
                    </Button>
                )}
            </div>
        </header>
    );
}

export default React.memo(Header);
