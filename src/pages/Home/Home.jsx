import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EventCard from '~/components/EventCard';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import { getUserInfor } from '~/redux/actions/eventAction';
import {  } from '@fortawesome/free-regular-svg-icons';


import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Home = () => {
    const options = ['Tất cả','Thể Thao', 'Sinh Hoạt Tập Thể', 'Talkshow','Ngày Hội Việc Làm','Cuộc Thi Khoa Học','Định Hướng Tương Lai','Lễ Kỷ Niệm','Nghệ Thuật','Ngày Hội & Triển Lãm'];
    const defaultOption = options[0];
    const profile = JSON.parse(localStorage.getItem('profile'));
    const [dataEvent, setDataEvent] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalEvents, setTotalEvents] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [eventJoined, setEventJoined] = useState([]);
    const [type, setType] = useState(defaultOption);


    const eventPerPage = 6;

    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true);

        const getAllEvent = async () => {
            await axios
                .get(`${process.env.REACT_APP_BASE_URL_API}event/all`)
                .then((response) => {
                    setEventJoined(response.data.filter((event) => event.participants.includes(profile._id)));
                })
                .catch((error) => {});
        };
        getAllEvent();
        setLoading(false);
    }, []);

    useEffect(() => {
        setLoading(true);

        const getAPIIdUser = async () => {
            await axios
                .get(`${process.env.REACT_APP_BASE_URL_API}profile`, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`,
                    },
                })
                .then((response) => {
                    dispatch(getUserInfor(response.data.sub));
                    // axios({
                    //     method: 'get',
                    //     url: `${process.env.REACT_APP_BASE_URL_API}user/${response.data.sub}`,
                    // }).then(function (response) {
                    //     dispatch(getUserInfor(response.data));
                    // });
                })
                .catch((error) => {
                    console.error(error);
                });
            setLoading(false);
        };

        getAPIIdUser();
    }, []);

    //call API:
    useEffect(() => {
        setLoading(true);

        const getAPIEvent = async () => {
            if (searchValue.length === 0 || searchValue === 'Tất cả') {
                await axios
                    .get(
                        `${process.env.REACT_APP_BASE_URL_API}event?page=${
                            pageNumber === 0 ? 1 : pageNumber
                        }&limit=${eventPerPage}`,
                        {},
                    )
                    .then((response) => {
                        setDataEvent(response.data.data);
                        setTotalEvents(response.data.total);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                
                await axios
                    .get(
                        `${process.env.REACT_APP_BASE_URL_API}event/search/${searchValue}?page=${
                            pageNumber === 0 ? 1 : pageNumber
                        }&limit=${eventPerPage}`,
                        {},
                    )
                    .then((response) => {
                        setDataEvent(response.data.data);
                        setTotalEvents(response.data.total);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            setLoading(false);
        };

        getAPIEvent();
    }, [pageNumber, searchValue , type]);

    // dragable event:

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const newItems = Array.from(dataEvent);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);

        setDataEvent(newItems);
    }

    //handle pagination button:
    const handleNextPage = () => {
        if (pageNumber >= Math.ceil(totalEvents / eventPerPage)) {
            setPageNumber(Math.ceil(totalEvents / eventPerPage) - 1);
        }
        setPageNumber((prevValue) => prevValue + 1);
    };
    const handlePrePage = () => {
        if (pageNumber <= 2) {
            setPageNumber(1);
        }
        if (pageNumber === 0) {
            setPageNumber((prevValue) => prevValue + 1);
        }
        setPageNumber((prevValue) => prevValue - 1);
    };

    return (
        <div className={cx('home', 'flex', 'flex-col', 'items-center','relative')}>
            <a href="https://www.facebook.com/KhoaDienUTH" target="_blank" className={cx('fb-icon')}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  height="1.6em" viewBox="0 0 48 48">
<path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
</svg>
            </a>
            <a href="https://www.youtube.com/" target="_blank" className={cx('ytb-icon')}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="1.6em" viewBox="0 0 48 48">
<path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
</svg>
            </a>
            <a href="https://www.tiktok.com/" target="_blank" className={cx('tt-icon')}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  height="1.6em" viewBox="0 0 48 48">
<path fill="#212121" fill-rule="evenodd" d="M10.904,6h26.191C39.804,6,42,8.196,42,10.904v26.191 C42,39.804,39.804,42,37.096,42H10.904C8.196,42,6,39.804,6,37.096V10.904C6,8.196,8.196,6,10.904,6z" clip-rule="evenodd"></path><path fill="#ec407a" fill-rule="evenodd" d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011 c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413 c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413L29.208,20.607L29.208,20.607 z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1 c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391 C17.213,29.127,17.972,30.274,19.079,30.832z" clip-rule="evenodd"></path><path fill="#fff" fill-rule="evenodd" d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157 c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923v16.018c-0.007,1.867-1.523,3.379-3.393,3.379 c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391 c0.359,0,0.705,0.056,1.03,0.159V21.38c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183 c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z" clip-rule="evenodd"></path><path fill="#81d4fa" fill-rule="evenodd" d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848 C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019 c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338 c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069 c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183 C14.374,24.749,17.611,21.463,21.635,21.38z" clip-rule="evenodd"></path>
</svg>
            </a>
            <div className={cx('event-board', 'w-11/12', '')}>
                <h5 className={cx('event-list-tag')}>Khám phá tất cả Sự kiện:</h5>
                

                <div className={cx('search-field', 'flex', 'items-center', 'justify-between')}>
                    <input
                        className={cx('search', 'p-3', 'mr-3', 'my-2', 'w-1/2')}
                        value={searchValue}
                        placeholder="Tìm kiếm theo từ khoá...."
                        onChange={(e) => {
                            setSearchValue(e.target.value.trim());
                        }}
                    />
                    <div className={cx('category','flex', 'flex-col', 'gap-1','w-1/2',)}>
                    <Dropdown
                       options={options}
                       onChange={(e) => {
                           setType(e.value);
                           setSearchValue(e.value)
                       }}
                       value={defaultOption}
                       placeholder="Thể loại"
                    />
                    </div>
                </div>
                
                

                <div className={cx('page-button','flex','gap-2','items-center',)}>
                <Button
                    className={cx(
                        'bg-blue-700',
                        'page-button-left',
                        'fixed',
                        'px-6','py-4',
                        'sm:px-5','sm:py-3',
                        `${(pageNumber === 1 || pageNumber === 0) && 'hover:bg-gray-400'}`,
                        `${(pageNumber === 1 || pageNumber === 0) && 'bg-gray-400'}`,
                    )}
                    onClick={handlePrePage}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={dataEvent}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {dataEvent.map((event, index) => (
                                    <Draggable key={event._id} draggableId={event._id} index={index}>
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <EventCard
                                                    disabled={
                                                        eventJoined.map((event) => event._id).includes(event._id)
                                                            ? true
                                                            : false
                                                    }
                                                    id={event._id}
                                                    key={event._id}
                                                    data={event}
                                                    className={cx('')}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <Button
                    className={cx(
                        'bg-blue-700',
                        'page-button-right',
                        'fixed',
                        'px-6','py-4',
                        'sm:px-5','sm:py-3',
                        `${pageNumber === Math.ceil(totalEvents / eventPerPage) && 'bg-gray-400'}`,
                        `${pageNumber === Math.ceil(totalEvents / eventPerPage) && 'hover:bg-gray-400'}`,
                    )}
                    onClick={handleNextPage}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
                </div>

            </div>

            <div className={cx('pagination', 'flex', 'self-center', '')}>
                
                
            </div>
        </div>
    );
};

export default memo(Home);
