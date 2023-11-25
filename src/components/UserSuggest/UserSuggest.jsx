import { useState, memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './UserSuggest.module.scss';
import Select from 'react-select';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAndEditParticipant, addParticipant, editParticipant, setModalIsOpen } from '~/redux/actions/eventAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import ModalContent from '../ModalContent';
import { CSVLink, CSVDownload } from 'react-csv';

import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        // width: '50%',
        // height: '50%',
        border: 'none',
        borderRadius: 20 + 'px',
        padding: 0,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
};

const cx = classNames.bind(styles);

function UserSuggest({ isUpdated, csvData }) {
    console.log('data to export',csvData);
    const participants = useSelector((state) => state.allEvents.participants);
    const editParticipants = useSelector((state) => state.allEvents.editParticipants);
    const [selectedOption, setSelectedOption] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const modalIsOpen = useSelector((state) => state.allEvents.modalIsOpen);
    const [idModal, setIdModal] = useState('');
    const dispatch = useDispatch();

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        dispatch(addParticipant(selectedOption));
        dispatch(addAndEditParticipant([...selectedOption]));
    };

    useEffect(() => {
        setLoading(true);
        const getAPIEvent = async () => {
            await axios
                .get(`${process.env.REACT_APP_BASE_URL_API}user/all`)
                .then((response) => {

                    setOptions(
                        response.data.map((data) => {
                            return { label: data.email, value: data._id ,data : data };
                        }),
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(false);
        };

        getAPIEvent();
    }, []);

    const allParticipants = useSelector((state) =>
        state.allEvents.addAndEditParticipants.map((participant) => participant.label),
    );

    const labeladdAndEditParticipants = useSelector((state) => state.allEvents.addAndEditParticipants);

    //console.log(allParticipants);
    //console.log(editParticipants);

    useEffect(() => {
        dispatch(addAndEditParticipant([...selectedOption]));
    }, [editParticipants.length]);

    return (
        <>
            <div className={cx('User-Suggest')}>
                <Select
                    //value={selectedOption}
                    value={selectedOption}
                    isMulti
                    onChange={handleChange}
                    options={
                        isUpdated
                            ? options
                                  .filter((item) => !editParticipants.find((x) => x.label === item.label))
                                  .concat(
                                      editParticipants.filter((item) => !options.find((x) => x.label === item.label)),
                                  )
                            : options
                    }
                    className={cx('basic-multi-select', 'rounded')}
                    classNamePrefix="select"
                    closeMenuOnSelect={false}
                />

                {editParticipants.length > 0 && (
                    <div>
                        <span className={cx('text-sm', 'font-bold')}>Đã tham gia:</span>
                        <div
                            className={cx(
                                'list-partipants-joined',
                                'flex',
                                'flex-wrap',
                                'gap-1',
                                'my-1',
                                'h-15',
                                'overflow-y-auto',
                            )}
                        >
                            {editParticipants.map((item) => {
                                return (
                                    <div
                                        key={item.value}
                                        className={cx(
                                            'email-participant',
                                            'text-xs',
                                            'py-1',
                                            'px-1',
                                            'cursor-pointer',
                                            'relative',
                                        )}
                                    >
                                        <span
                                            onClick={() => {
                                                dispatch(setModalIsOpen(true));
                                                setIdModal(item.value);
                                            }}
                                        >
                                            {item.label}
                                        </span>

                                        <FontAwesomeIcon
                                            className={cx('icon-x', 'mx-1')}
                                            icon={faTimes}
                                            onClick={() => {
                                                dispatch(editParticipant(editParticipants.filter((x) => x !== item)));
                                                //setSelectedOption([...selectedOption, item]);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {csvData.length > 0 && (
                    <CSVLink className={cx('csv')} data={csvData} filename={'Danh_sách_thành_viên.csv'}>
                        <div
                            className={cx(
                                'btn-csv',
                                'px-2',
                                'py-1',
                                'z-0',
                                'w-1/5',
                                'text-base',
                                'text-center',
                                'my-2',
                            )}
                        >
                            <span>
                                <FontAwesomeIcon icon={faFileExport} className={cx('mr-1')} />
                                Xuất file
                            </span>
                        </div>
                    </CSVLink>
                )}

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => dispatch(setModalIsOpen(false))}
                    className="Modal"
                    overlayClassName="Overlay"
                    style={customStyles}
                >
                    <ModalContent data={idModal} />
                </Modal>
            </div>
        </>
    );
}

UserSuggest.propTypes = {};
export default memo(UserSuggest);
