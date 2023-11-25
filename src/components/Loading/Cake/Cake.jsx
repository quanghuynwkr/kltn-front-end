import React from 'react';
import classNames from 'classnames/bind';
import styles from './Cake.module.scss';

const cx = classNames.bind(styles);

function Cake() {
    return (
        <>
            <div className={cx('loader')}>
                <div className={cx('tall-stack')}>
                    <div className={cx('butter', 'falling-element')}></div>
                    <div className={cx('pancake', 'falling-element')}></div>
                    <div className={cx('pancake', 'falling-element')}></div>
                    <div className={cx('pancake', 'falling-element')}></div>
                    <div className={cx('pancake', 'falling-element')}></div>
                    <div className={cx('pancake', 'falling-element')}></div>
                    <div className={cx('pancake', 'falling-element')}></div>
                    <div className={cx('plate')}>
                        <div className={cx('plate-bottom')}></div>
                        <div className={cx('shadow')}></div>
                    </div>
                </div>
            </div>

            <footer className={'footer'}></footer>
        </>
    );
}

Cake.propTypes = {};
export default React.memo(Cake);
