import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './UserList.module.scss';
import axios from 'axios';
import UserCard from '../UserCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function UserList({}) {
    const [searchValue, setSearchValue] = useState('');
    const [dataUser, setDataUser] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const userPerPage = 3;

    //call API:
    useEffect(() => {
        setLoading(true);

        const getAPIUser = async () => {
            if (searchValue.length === 0) {
                await axios
                    .get(
                        `${process.env.REACT_APP_BASE_URL_API}user?page=${
                            pageNumber === 0 ? 1 : pageNumber
                        }&limit=${userPerPage}`,
                        {},
                    )
                    .then((response) => {
                        setDataUser(response.data.data);
                        setTotalUsers(response.data.total);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                await axios
                    .get(
                        `${process.env.REACT_APP_BASE_URL_API}user/search/${searchValue}?page=${
                            pageNumber === 0 ? 1 : pageNumber
                        }&limit=${userPerPage}`,
                        {},
                    )
                    .then((response) => {
                        setDataUser(response.data.data);
                        setTotalUsers(response.data.total);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            setLoading(false);
        };

        getAPIUser();
    }, [pageNumber, searchValue]);

    // dragable event:

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const newItems = Array.from(dataUser);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);

        setDataUser(newItems);
    }

    //handle pagination button:
    const handleNextPage = () => {
        if (pageNumber >= Math.ceil(totalUsers / userPerPage)) {
            setPageNumber(Math.ceil(totalUsers / userPerPage) - 1);
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
        <div className={cx('board', '', 'flex', 'flex-col', '', 'md:w-1/2', 'md:ml-3')}>
            <div className={cx('user-board')}>
                <h4 className={cx('user-list-tag')}>Danh sách thành viên:</h4>

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
                    <Droppable droppableId={dataUser}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {dataUser.map((user, index) => (
                                    <Draggable key={user._id} draggableId={user._id} index={index}>
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <UserCard id={user._id} key={user._id} data={user} />
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
                        `${pageNumber === Math.ceil(totalUsers / userPerPage) && 'bg-gray-400'}`,
                        `${pageNumber === Math.ceil(totalUsers / userPerPage) && 'hover:bg-gray-400'}`,
                    )}
                    onClick={handleNextPage}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            </div>
        </div>
    );
}

UserList.propTypes = {};
export default React.memo(UserList);
