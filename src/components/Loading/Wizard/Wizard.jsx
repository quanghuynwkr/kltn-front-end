import React from 'react';
import classNames from 'classnames/bind';
import styles from './Wizard.module.scss';

const cx = classNames.bind(styles);

function Wizard() {
    return (
        <div className={cx('wizard-loading', '', 'flex', 'flex-col', 'items-center', 'mt-10')}>
            <div className={cx('scene')}>
                <div className={cx('objects')}>
                    <div className={cx('square')}></div>
                    <div className={cx('circle')}></div>
                    <div className={cx('triangle')}></div>
                </div>
                <div className={cx('wizard')}>
                    <div className={cx('body')}></div>
                    <div className={cx('right-arm')}>
                        <div className={cx('right-hand')}></div>
                    </div>
                    <div className={cx('left-arm')}>
                        <div className={cx('left-hand')}></div>
                    </div>
                    <div className={cx('head')}>
                        <div className={cx('beard')}></div>
                        <div className={cx('face')}>
                            <div className={cx('adds')}></div>
                        </div>
                        <div className={cx('hat')}>
                            <div className={cx('hat-of-the-hat')}></div>
                            <div className={cx('four-point-star', 'four-point-star--first')}></div>
                            <div className={cx('four-point-star ', 'four-point-star--second')}></div>
                            <div className={cx('four-point-star', 'four-point-star--third')}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('progress', 'w-3/4')}></div>
            <div className={cx('noise')}></div>
        </div>
    );
}

Wizard.propTypes = {};
export default React.memo(Wizard);
