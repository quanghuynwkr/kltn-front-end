import React from 'react';
import classNames from 'classnames/bind';
import styles from './Pen.module.scss';

const cx = classNames.bind(styles);

function Pen() {
    return <div className={cx('rainbow-marker-loader')}></div>;
}

Pen.propTypes = {};
export default React.memo(Pen);
