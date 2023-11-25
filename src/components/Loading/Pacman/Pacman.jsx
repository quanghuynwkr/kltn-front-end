import React from 'react';
import classNames from 'classnames/bind';
import styles from './Pacman.module.scss';

const cx = classNames.bind(styles);

function Pacman() {
    return <div className={cx('pac-man')}></div>;
}

Pacman.propTypes = {};
export default React.memo(Pacman);
