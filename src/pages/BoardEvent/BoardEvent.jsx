import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './BoardEvent.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import EventCard from '~/components/EventCard';

import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import EventForm from '~/components/EventForm';
import EventList from '~/components/EventList';

const cx = classNames.bind(styles);

const BoardEvent = () => {
    const [show, setShow] = useState(true);

    // check kích thước màn hình ;
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    return (
        <div className={cx('board-event', 'flex', 'flex-col', 'lg:flex-row', 'justify-center',)}>
            <div className={cx('show-form', 'md:hidden', 'block', 'flex', 'items-center', 'gap-1', 'my-4')}>
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
            {show && <EventForm className={cx(`${!show && 'hidden'}`, 'md:block', 'event-form', 'flex-1', 'mr-5')} />}

            <EventList />
        </div>
    );
};

export default memo(BoardEvent);
