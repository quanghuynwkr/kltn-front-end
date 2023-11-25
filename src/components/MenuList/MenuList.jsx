import React from 'react';
import classNames from 'classnames/bind';
import styles from './MenuList.module.scss';

const cx = classNames.bind(styles);

function MenuList({ children, className, onClick = false }) {
    const classes = cx('MenuList', {
        [className]: className,
    });

    return (
        <div
            onClick={() => {
                onClick && onClick();
            }}
            className={cx(classes, 'flex', 'items-center', 'justify-center', 'md:mt-5', 'mt-10')}
        >
            {children}
        </div>
    );
}

MenuList.propTypes = {};
export default React.memo(MenuList);
