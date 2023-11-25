import { useState, memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './UserForm.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { editEvent, editParticipant, addAndEditParticipant } from '~/redux/actions/eventAction';

import 'react-dropdown/style.css';
import Button from '../Button';
import validator from 'validator';
import UserSuggest from '../UserSuggest';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const cx = classNames.bind(styles);

function UserForm({}) {
    const idUpdate = useSelector((state) => state.allEvents.idUpdateUser);
    const isUpdate = useSelector((state) => state.allEvents.isUpdateUser);
    const options = ['user', 'admin'];
    const defaultOption = options[0];
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [identifyCard, setIdentifyCard] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState(defaultOption);
    useEffect(() => {
        setLoading(true);

        const getAPIEvent = async () => {
            await axios
                .get(`${process.env.REACT_APP_BASE_URL_API}user/all/${idUpdate}`, {})
                .then((response) => {
                    if (isUpdate) {
                        setUserName(response.data.userName);
                        setEmail(response.data.email);
                        setPassword(response.data.password);
                        setIdentifyCard(response.data.identifyCard);
                        setBirthDate(response.data.birthDate);
                        setPhoneNumber(response.data.phoneNumber);
                        setRole(response.data.role)
                        // dispatch(
                        //     editParticipant(
                        //         response.data.participants.map((participant) => {
                        //             return { label: participant.email, value: participant._id };
                        //         }),
                        //     ),
                        // );
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(false);
        };

        getAPIEvent();
    }, [idUpdate]);

    const handlePhoneNumber = (event) => {
        const phoneNumber = event.target.value.replace(/\D/g, '');
        // Giới hạn độ dài chuỗi nhập vào là 10 ký tự
        if (phoneNumber.length <= 11) {
            // Cập nhật giá trị phone trong state
            setPhoneNumber(phoneNumber);
        }
    };

    const handleUserForm = (e) => {
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

        if (validator.isEmpty(email) || validator.isEmpty(password)) {
            alert('Không được bỏ trống');
        } else if (!validator.isEmail(email)) {
            alert('Email không hợp lệ.');
            return;
        } else if (!validatePassword(password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ hoa, một chữ thường và một số.');
            return;
        }
        else if (!isEduEmail(email)) {
            alert('Không đúng dịnh dạng email.');
            return;
        }

        if (isUpdate) {
            axios
                .patch(`${process.env.REACT_APP_BASE_URL_API}user/all/${idUpdate}`, {
                    userName,
                    email,
                    password,
                    identifyCard,
                    birthDate,
                    phoneNumber,
                    role,
                   
                })
                .then((response) => {
                    alert('Chỉnh sửa thành công:' + email);
                    window.location.reload();
                })
                .catch((error) => {
                    alert('Email đã bị trùng');
                    //alert('Chỉnh sửa thất bại:' + email);

                    console.log(error);
                });
        } else {
            axios
                .post(`${process.env.REACT_APP_BASE_URL_API}user`, {
                    userName,
                    email,
                    password,
                    identifyCard,
                    birthDate,
                    phoneNumber,
                    role,
                    avatarUrl:'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'
                })
                .then((response) => {
                    alert('Thêm thành công: ' + email);
                    window.location.reload();
                })
                .catch((error) => {
                    alert('Thêm thất bại: ' + email);

                    console.log(error);
                });
        }
    };

    return (
        <div className={cx('user-form', 'flex', 'flex-col', 'flex-1')}>
            <h4 className={cx('text-center')}>{isUpdate ? 'Chỉnh sửa thành viên' : 'Thêm Thành viên'}</h4>
            <form onSubmit={handleUserForm} action="" className={cx('form-event', 'flex', 'flex-col', 'gap-3')}>
                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="userName" className={cx('')}>
                        Tên:
                    </label>
                    <input
                        placeholder="Nhập tên"
                        required
                        type="text"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3', '')}
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="email" className={cx('')}>
                        Email:
                    </label>
                    <input
                        placeholder="Nhập email"
                        required
                        type="email"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3', '')}
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="Password" className={cx('')}>
                        Mật khẩu:
                    </label>
                    <input
                        placeholder="Nhập mật khẩu"
                        required
                        type="password"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3', '')}
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="IdentifyCard" className={cx('')}>
                        CMND/CCCD:
                    </label>
                    <input
                        placeholder="Nhập CMND/CCCD"
                        type="number"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3', '')}
                        name="IdentifyCard"
                        value={identifyCard}
                        onChange={(e) => setIdentifyCard(e.target.value)}
                        required
                    />
                </div>

                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="BirthDate" className={cx('')}>
                        Ngày sinh:
                    </label>
                    <input
                        placeholder="Nhập..."
                        required
                        type="datetime-local"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3', '')}
                        name="BirthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="PhoneNumber" className={cx('')}>
                        SĐT:
                    </label>
                    <input
                        placeholder="Nhập..."
                        required
                        type="tel"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3', '')}
                        name="PhoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        pattern="0[0-9]{9}" // Định dạng hiển thị theo chuẩn Việt Nam
                    />
                </div>

                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="type" className={cx('')}>
                        Role:
                    </label>
                    {/* <input
                        type="dropdown"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3')}
                        name="type"
                        placeholder="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    /> */}
                    <Dropdown
                        options={options}
                        onChange={(e) => {
                            setRole(e.value);
                        }}
                        value={role}
                        placeholder="Select an option"
                    />
                </div>

                <Button className={cx('lg:w-1/2', 'w-1/2', 'md:w-3/5', 'self-center')}>
                    {isUpdate ? 'Chỉnh sửa ' : 'Thêm'}
                </Button>
            </form>
        </div>
    );
}

UserForm.propTypes = {};
export default memo(UserForm);
