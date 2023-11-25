import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileEdit.module.scss';
import { useEffect, useState, memo } from 'react';
import validator from 'validator';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { getUserInfor, setProfile } from '~/redux/actions/eventAction';

import { storage } from '../../firebase-config';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const cx = classNames.bind(styles);

function ProfileEdit({}) {
    const navigate = useNavigate();
    const idUserInfor = useSelector((state) => state.allEvents.userInfor);
    const dispatch = useDispatch();
    const profile = JSON.parse(localStorage.getItem('profile'));
    
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState(profile.userName);
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState(profile.password);
    const [identifyCard, setIdentifyCard] = useState(profile.identifyCard);
    const [birthDate, setBirthDate] = useState(profile.birthDate);
    const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber);
   

    const [file, setFile] = useState(null);
    const handlePhoneNumber = (event) => {
        const phoneNumber = event.target.value.replace(/\D/g, '');
        // Giới hạn độ dài chuỗi nhập vào là 10 ký tự
        if (phoneNumber.length <= 11) {
            // Cập nhật giá trị phone trong state
            setPhoneNumber(phoneNumber);
        }
    };
    // useEffect(() => {
    //     setLoading(true);

    //     const getProfileUser = async () => {
    //         await axios({
    //             method: 'get',
    //             url: `${process.env.REACT_APP_BASE_URL_API}user/all/${idUserInfor}`,
    //         })
    //             .then((response) => {
    //                 setUserName(response.data.userName);
    //                 setEmail(response.data.email);
    //                 setPassword(response.data.password);
    //                 setIdentifyCard(response.data.identifyCard);
    //                 setBirthDate(response.data.birthDate);
    //                 setPhoneNumber(response.data.phoneNumber);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     };
    //     getProfileUser();
    //     setLoading(false);
    // }, []);

    const handleEditProfile = (e) => {
        e.preventDefault();
        const validatePassword = (password) => {
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            return re.test(password);
        };

        if (validator.isEmpty(email) || validator.isEmpty(password)) {
            alert('Không được bỏ trống');
        } else if (!validator.isEmail(email)) {
            alert('Email không hợp lệ.');
            return;
        } else if (!validatePassword(password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ hoa, một chữ thường và một số.');
            return;
        }
      

        if (file == null) return;
        const imageRef = ref(storage, `eventIMG/${Date.now()}`);
        uploadBytesResumable(imageRef, file).then(() => {
            getDownloadURL(imageRef).then((path) => {
                axios
                .patch(`${process.env.REACT_APP_BASE_URL_API}user/all/${idUserInfor}`, {
                    userName,
                    email,
                    password,
                    identifyCard,
                    birthDate,
                    phoneNumber,
                    avatarUrl:path
                })
                .then((response) => {
                    alert('Chỉnh sửa thành công cho:' + email);
                    //after edit then set user infor again:
                    navigate('/');
                    axios
                        .post(`${process.env.REACT_APP_BASE_URL_API}auth/login`, { email, password })
                        .then((response) => {
                            if (response.data.access_token) {
                                localStorage.setItem('user', JSON.stringify(response.data.access_token));
                                // get access token:
                                axios
                                    .get('https://finalgraduate-nestjs.vercel.appprofile', {
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
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                                //navigate('/profile');
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    alert('Chỉnh sửa thất bại cho:' + email);
    
                    console.log(error);
                });
               
            });
        });


      
    };

    return (
        <div className={cx('Profile-Edit')}>
            <form
                onSubmit={handleEditProfile}
                action=""
                className={cx('form', 'flex', 'flex-col', 'items-center', 'p-3','lg:mx-24','sm:mx-5')}
            >
                <h2 className={cx('text-center',)}>Chỉnh sửa thông tin cá nhân</h2>
                <div className={cx('form-group', 'flex', 'self-start', 'w-full',)}>
                    <label htmlFor="userName" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl','font-bold')}>
                        Tên:
                    </label>
                    <input
                        required
                        type="text"
                        className={cx('form-control', 'lg:w-4/5', 'w-3/5', 'p-2', '')}
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="email" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl','font-bold')}>
                        Email:
                    </label>
                    <input
                        required
                        type="email"
                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5')}
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="Password" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl','font-bold')}>
                        Password:
                    </label>
                    <input
                        required
                        type="text"
                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5')}
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="IdentifyCard" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl','font-bold')}>
                        CMND/CCCD:
                    </label>
                    <input
                        type="number"
                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5')}
                        name="IdentifyCard"
                        value={identifyCard}
                        onChange={(e) => setIdentifyCard(e.target.value)}
                        required
                    />
                </div>

                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="BirthDate" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl','font-bold')}>
                        Ngày sinh:
                    </label>
                    <input
                        required
                        type="datetime-local"
                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5', 'break-words')}
                        name="BirthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="PhoneNumber" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl','font-bold')}>
                        SĐT:
                    </label>
                    <input
                        required
                        type="tel"
                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5')}
                        name="PhoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        pattern="0[0-9]{9}" // Định dạng hiển thị theo chuẩn Việt Nam
                    />
                </div>
                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="avatarUrl" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl','font-bold')}>
                    Ảnh đại diện:
                    </label>
                    
                    <input
                        type="file"
                        required

                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5')}
                        name="avatarUrl"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                   
                </div>

                <Button >Lưu</Button>
            </form>
        </div>
    );
}

ProfileEdit.propTypes = {};
export default React.memo(ProfileEdit);
