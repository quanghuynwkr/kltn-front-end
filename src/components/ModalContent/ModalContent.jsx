import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalContent.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setModalIsOpen } from '~/redux/actions/eventAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const cx = classNames.bind(styles);

function ModalContent({ data }) {
    const dispatch = useDispatch();

    const [value, setValue] = useState([]);
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setLoading(true);
        const getAPIEvent = async () => {
            await axios
                .get(`${process.env.REACT_APP_BASE_URL_API}user/all/${data}`)
                .then((response) => {
                    setValue(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(false);
        };
        const getAllEvent = async () => {
            await axios
                .get(`${process.env.REACT_APP_BASE_URL_API}event/all`)
                .then((response) => {
                    setEvents(response.data.filter((event) => event.participants.includes(data)));
                })
                .catch((error) => {});
        };

        getAPIEvent();
        getAllEvent();
    }, []);
    console.log(events);

    return (
        <div className={cx('Modal-Content', 'flex', 'flex-col', 'items-center', 'p-6', 'relative', 'text-xl')}>
            <button
                className={cx('icon-close', 'font-bold', 'text-2xl', 'self-end', 'bg-white', 'cursor-pointer')}
                onClick={() => dispatch(setModalIsOpen(false))}
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <h1 className="text-center">Thông tin người tham gia</h1>
            <div className={cx('field', 'flex', 'self-start', 'mt-4')}>
                <h4 className={cx('label', 'mr-2')}> Tên:</h4>
                <span className={cx('content')}>{value.userName ? value.userName : 'đang cập nhập'}</span>
            </div>
            <div className={cx('field', 'flex', 'self-start', 'mt-4')}>
                <h4 className={cx('label', 'mr-2')}> Email:</h4>
                <span className={cx('content')}>{value.email ? value.email : 'đang cập nhập'}</span>
            </div>
            <div className={cx('field', 'flex', 'self-start', 'mt-4')}>
                <h4 className={cx('label', 'mr-2')}> SĐT:</h4>
                <span className={cx('content')}>{value.phoneNumber ? value.phoneNumber : 'đang cập nhập'}</span>
            </div>
            <div className={cx('field', 'flex', 'self-start', 'mt-4')}>
                <h4 className={cx('label', 'mr-2')}> CMND/CCCD:</h4>
                <span className={cx('content')}>{value.identifyCard ? value.identifyCard : 'đang cập nhập'}</span>
            </div>
            <div className={cx('field', 'flex', 'self-start', 'mt-4')}>
                <h4 className={cx('label', 'mr-2')}> Sinh nhật:</h4>
                <span className={cx('content')}>
                    {value.birthDate ? value.birthDate.slice(0, 10) : 'đang cập nhập'}
                </span>
            </div>
            <div className={cx('field', 'flex', 'self-start', 'mt-4')}>
                <h4 className={cx('label', 'mr-2')}> Ngày tạo tài khoản:</h4>
                <span className={cx('content')}>
                    {value.createdAt ? value.createdAt.slice(0, 10) : 'đang cập nhập'}
                </span>
            </div>
            {/* <div className={cx('field', 'flex', 'self-start', 'mt-4')}>
                <h4 className={cx('label', 'mr-2')}> Các sự kiện tham gia:</h4>

                <ul lassName={cx('truncate ...')}>
                    {events.map((event) => (
                        <li className={cx('truncate ...')}>.{event.title}</li>
                    ))}
                </ul>
            </div> */}
            <div className={cx('field', 'flex', 'self-start', 'mt-4')}>
                <h4>Các sự kiện tham gia:</h4>
            </div>
            <div className={cx('field', 'flex', 'mt-4', 'text-xs', 'self-start', 'flex-col')}>
                {events.map((event) => (
                    <div className="text-ellipsis overflow-hidden ...">.{event.title.slice(0, 30)}...</div>
                ))}
            </div>

            <div className={cx('bar')}></div>
        </div>
    );
}

ModalContent.propTypes = {};
export default React.memo(ModalContent);
