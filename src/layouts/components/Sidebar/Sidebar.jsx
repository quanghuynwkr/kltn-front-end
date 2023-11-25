import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuList from '~/components/MenuList';
import MenuItem from '~/components/MenuList/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faUserGear } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SideBar() {
    //const showSideBar = useSelector((state) => state.allMusics.isShowSideBar);
    //const dispatch = useDispatch();

    return (
        <div className={cx('side-bar')}>
            <MenuList>
                <MenuItem to={'/board-events'}  className={cx('flex','items-center')}>          
                    <FontAwesomeIcon icon={faCalendarDays} />               
                    <span className={cx('event','ml-1','flex','items-center','justify-center')}> Phong trào / sự kiện</span>
                </MenuItem>
                <MenuItem to={'/board-users'}>
                    <FontAwesomeIcon icon={faUserGear} />
                    <span className={cx('user','ml-1','flex','items-center')}> Quản lý người dùng</span>
                </MenuItem>
            </MenuList>
        </div>
    );
}

export default React.memo(SideBar);
