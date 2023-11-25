import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './UserCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressCard,
    faCalendarCheck,
    faEnvelope,
    faPenToSquare,
    faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { addAndEditParticipant, editEvent, editParticipant, editUser } from '~/redux/actions/eventAction';
import axios from 'axios';
import { faBirthdayCake, faPhone, faSignature, faToolbox, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function UserCard({ id, data, className, onClick = false, onDoubleClick = false, disabled = false }) {
    const classes = cx('UserCard', {
        disabled,
        [className]: className,
    });
   
    const profile = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const handleDeleteUser = (id) => {
        axios
            .delete(`${process.env.REACT_APP_BASE_URL_API}user/all/${id}`)
            .then((response) => {
                alert('Xóa thành viên thành công:', data.email);
                window.location.reload();
            })
            .catch((error) => {
                alert('Xóa thành viên thất bại:', error);
            });
    };

    return (
        <div
            className={cx(
                'user-card',
                'gap-1',
                'w-full',
                'flex',
                'flex-col',
                'py-4',
                'px-5',
                'text-base',
                'mb-3',

                classes,
            )}
        >
            <div className={cx('field', 'text-2xl', 'text-blue-600', 'font-extrabold' , 'flex' , 'items-center')}>
            <img  src={data.avatarUrl ?data.avatarUrl: 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'}  alt=""  className={cx('avatar')} />
                <span className={cx('ml-1')}>{data.userName || 'chưa cập nhập'}</span>
            </div>
            <div className={cx('field')}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span className={cx('ml-1')}>{data.email}</span>
            </div>

            <div className={cx('field')}>
                <FontAwesomeIcon icon={faAddressCard} />
                <span className={cx('ml-1')}>{data.identifyCard || 'chưa cập nhập'}</span>
            </div>
            <div className={cx('field')}>
                <FontAwesomeIcon icon={faPhone} />
                <span className={cx('ml-1')}>{data.phoneNumber || 'chưa cập nhập'}</span>
            </div>
            <div className={cx('field')}>
                <FontAwesomeIcon icon={faBirthdayCake} />
                <span className={cx('ml-1')}>{data.birthDate || 'chưa cập nhập'}</span>
            </div>

            <div className={cx('btn-event', 'flex')}>
                <Button
                    onClick={() => {
                        dispatch(editUser(data._id));
                    }}
                    className={cx('lg:w-1/6', 'w-2/6')}
                    blackBtn
                >
                    <FontAwesomeIcon icon={faToolbox} className={cx('edit-icon', 'mr-1')} /> Sửa
                </Button>
                <Button
                    onClick={() => {
                        handleDeleteUser(data._id);
                    }}
                    className={cx('lg:w-1/6', 'w-2/6', 'ml-1')}
                    redBtn
                >
                    <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon', 'mr-1')} /> Xoá
                </Button>
            </div>
        </div>
    );
}

UserCard.propTypes = {};
export default React.memo(UserCard);
