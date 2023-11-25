import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header/Header';
import { useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { pathname } = useLocation();
    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log(profile);
    
    return (
        <>
            <div className={cx('wrapper', ['', 'h-screen'])}>
                <div className={cx('folder', ['flex', 'flex-col'])}>
                    <Header />
                    { ( profile?.role === 'admin' && <SideBar />)}
                   

                    <div className={cx('content', 'mx-12')}>{children}</div>
                </div>
            </div>
        </>
    );
}

DefaultLayout.prototypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
