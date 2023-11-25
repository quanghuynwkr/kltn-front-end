import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EventList.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EventCard from '~/components/EventCard';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const cx = classNames.bind(styles);

function EventList({}) {
    const [searchValue, setSearchValue] = useState('');
    const [dataEvent, setDataEvent] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalEvents, setTotalEvents] = useState(0);
    const eventPerPage = 2;

    //call API:
    useEffect(() => {
        setLoading(true);

        const getAPIEvent = async () => {
            if (searchValue.length === 0) {
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
    }, [pageNumber, searchValue]);

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
        <div className={cx('board', 'flex-1', 'flex', 'flex-col', '', 'md:w-full')}>
            <div className={cx('event-board')}>
                <h4 className={cx('event-list-tag')}>Danh sách sự kiện:</h4>

                <div className={cx('search-field', 'flex', 'items-center', '')}>
                    <input
                        className={cx('search', 'p-5', 'mr-3', 'my-2', 'w-full')}
                        value={searchValue}
                        placeholder="Tìm kiếm..."
                        onChange={(e) => {
                            setSearchValue(e.target.value.trim());
                        }}
                    />
                </div>

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
                                                <EventCard id={event._id} key={event._id} data={event} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <div className={cx('pagination', 'flex', 'self-center', 'lg:self-end')}>
                <Button
                    className={cx(
                        'mr-2',
                        'w-1/2',
                        'bg-blue-700',
                        `${(pageNumber === 1 || pageNumber === 0) && 'hover:bg-gray-400'}`,
                        `${(pageNumber === 1 || pageNumber === 0) && 'bg-gray-400'}`,
                    )}
                    onClick={handlePrePage}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <Button
                    className={cx(
                        'w-1/2',
                        'bg-blue-700',
                        `${pageNumber === Math.ceil(totalEvents / eventPerPage) && 'bg-gray-400'}`,
                        `${pageNumber === Math.ceil(totalEvents / eventPerPage) && 'hover:bg-gray-400'}`,
                    )}
                    onClick={handleNextPage}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            </div>
        </div>
    );
}

EventList.propTypes = {};
export default React.memo(EventList);
