import { useEffect, useState, memo } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import validator from 'validator';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Register = () => {
    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState('');

    const [password, setPassword] = useState('');

    const [checkPassword, setCheckPassword] = useState('');

    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [checkConfirmPass, setCheckConfirmPass] = useState('');

    const navigate = useNavigate();

    

    const handleImageChange = (e) => {
        e.preventDefault();

      
    };

    const handleRegister = (e) => {
        e.preventDefault();

       
        const validatePassword = (password) => {
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            return re.test(password);
        };
        function isEduEmail(email) {
            // Sử dụng biểu thức chính quy để kiểm tra xem email có kết thúc bằng .edu hay không
            const eduEmailRegex = /\.edu.vn$/i; // 'i' là để không phân biệt chữ hoa chữ thường
          
            // Kiểm tra xem email có khớp với biểu thức chính quy không
            return eduEmailRegex.test(email);
          }

        if (validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(confirmedPassword)) {
            alert('Không được bỏ trống');
        } else if (!validator.isEmail(email)) {
            alert('Email không hợp lệ.');
            return;
        } else if (password !== confirmedPassword) {
            alert('Mật khẩu và nhập lại mật khẩu không trùng khớp.');
            return;
        } else if (!validatePassword(password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ hoa, một chữ thường và một số.');
            return;
        }else if (!isEduEmail(email)) {
            alert('Không đúng dịnh dạng email.');
            return;
        }

        const createUser = async (email, password) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL_API}user`, {
                    email,
                    password,
                });

                alert('Đăng kí thành công');
                navigate('/');
            } catch (error) {
                alert('Email đã tồn tại');
                console.log(error);
            }
        };

        // const validateConfirmPassword = (password, confirmPassword) => {
        //     if (password !== confirmPassword) {
        //         setCheckConfirmPass('Mật khẩu và nhập lại mật khẩu không trùng khớp.');
        //     }
        //     if (confirmPassword === '') {
        //         setCheckConfirmPass('Không được bỏ trống.');
        //     }
        //     setConfirmedPassword('');
        // };

        // const validateEmail = (email) => {
        //     if (validator.isEmpty(email)) {
        //         setCheckEmail('Không được bỏ trống');
        //     }
        //     if (!validator.isEmail(email)) {
        //         setCheckEmail('Nhập đúng dạng email');
        //     }
        //     setCheckEmail('');
        // };
        // const validatePassword = (password) => {
        //     if (validator.isEmpty(password)) {
        //         setCheckPassword('Không được bỏ trống');
        //     } else if (!/[A-Z]/.test(password)) {
        //         setCheckPassword('Ít nhất có 1 kí tự hoa');
        //     } else if (!/[a-z]/.test(password)) {
        //         setCheckPassword('Ít nhất có 1 kí tự thường');
        //     } else if (password.length < 8) {
        //         setCheckPassword('Ít nhất có 8 kí tự');
        //     }
        //     setCheckPassword('');
        // };

        createUser(email, password);
    };

    return (
        <div className={cx('register', 'flex', 'flex-col', 'justify-center', 'items-center')}>
            <form
                onSubmit={handleRegister}
                action=""
                className={cx(
                    'form',
                    'flex',
                    'flex-col',
                    'md:w-1/2','md:p-10','md:mt-2',
                    'lg:w-1/3','lg:mt-0',
                    'sm:w-1/2',
                    '2xl:w-1/4',
                    'p-4',                
                )}
            >
                <img 
                    className={cx('login-logo', [
                        
                    ])}
                    src={"https://tuyensinh.ut.edu.vn/wp-content/uploads/2022/07/logo-full.png"}

                           
                />
                <div className={cx('self-center', 'wrapper', 'lg:text-xl', 'md:text-xs', 'text-sm')}>
                    <h1 className={cx('playful')} aria-label="Wash your hands">
                        <span aria-hidden="true">Đ</span>
                        <span aria-hidden="true">Ă</span>
                        <span aria-hidden="true">N</span>
                        <span aria-hidden="true">G</span>

                        <span aria-hidden="true"> </span>
                        <span aria-hidden="true">K</span>
                        <span aria-hidden="true">Ý</span>
                        <span aria-hidden="true"> </span>

                        <span aria-hidden="true">!</span>
                    </h1>
                </div>

                <div className={cx('form-group', 'flex','flex-col','text-xl')}>
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

                <div className={cx('form-group', 'flex','flex-col','text-xl')}>
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
                </div>

                <div className={cx('form-group', 'flex','flex-col','text-xl')}>
                    <label htmlFor="ConfirmedPassword" className={cx('', '')}>
                        Confirmed Password:
                    </label>
                    <input
                        type="password"
                        className={cx('form-control', '', 'p-2', '')}
                        name="ConfirmedPassword"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'self-center')}>
                    <Button className={cx('btn', 'rounded-md')}>ĐĂNG KÝ</Button>
                </div>
            </form>
        </div>
    );
};

export default memo(Register);
