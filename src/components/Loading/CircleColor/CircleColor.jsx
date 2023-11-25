import React from 'react';
import classNames from 'classnames/bind';
import styles from './CircleColor.module.scss';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function CircleColor() {
    return (
        <div className={cx('circle-color')}>
            <svg
                className={cx('spinner')}
                width="65px"
                height="65px"
                viewBox="0 0 66 66"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    className={cx('path')}
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    cx="33"
                    cy="33"
                    r="30"
                ></circle>
            </svg>
        </div>
    );
}

CircleColor.propTypes = {};
export default React.memo(CircleColor);
