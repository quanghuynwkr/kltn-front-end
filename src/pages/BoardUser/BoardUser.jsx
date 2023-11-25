import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './BoardUser.module.scss';
import UserForm from '~/components/UserForm';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import UserList from '~/components/UserList';

const cx = classNames.bind(styles);

const BoardUser = () => {
    const [show, setShow] = useState(true);

    // check kích thước màn hình ;
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    return (
        <div className={cx('board-user', 'flex', 'flex-col', 'md:flex-row', 'md:justify-between', 'justify-center')}>
            <div className={cx('show-form', 'md:hidden', 'block', 'flex', 'items-center', 'gap-3', 'my-4')}>
                {!show ? (
                    <Button
                        onClick={() => {
                            setShow(!show);
                        }}
                        className={cx('btn-show', 'flex', 'gap-1', 'items-center')}
                    >
                        <FontAwesomeIcon icon={faEye} className={cx('eye-show', '')} /> <h4>Hiện form :</h4>
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            setShow(!show);
                        }}
                        className={cx('btn-hidden', 'flex', 'gap-1', 'items-center')}
                    >
                        {' '}
                        <FontAwesomeIcon icon={faEyeSlash} className={cx('eye-show', '')} /> <h4>Ẩn form :</h4>
                    </Button>
                )}
            </div>
            {show && <UserForm className={cx(`${!show && 'hidden'}`, 'md:block', 'user-form', 'flex-1', 'mr-5', '')} />}

            <UserList />
        </div>
    );
};

export default memo(BoardUser);
