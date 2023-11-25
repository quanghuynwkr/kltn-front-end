import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import CircleColor from './CircleColor';
import Pacman from './Pacman';
import Wizard from './Wizard';
import Cake from './Cake';
import Pen from './Pen';

const cx = classNames.bind(styles);

function Loading() {
    const Animation = () => {
        const animateList = [<Cake />, <CircleColor />, <Pacman />, <Wizard />, <Pen />];
        const random = Math.floor(Math.random() * animateList.length);
        return animateList[random];
    };

    return (
        <div className={cx('loading', 'flex', 'flex-col', 'items-center', 'justify-center', '')}>
            <div className={cx('loader')}>
                <div className={cx('bubble')}>
                    <div className={cx('bubble__shine bubble__shine--lg')}></div>
                    <div className={cx('bubble__shine bubble__shine--sm')}></div>
                </div>
                <p className={cx('text')}>
                    Lo<span className={cx('text__highlight')}>a</span>din
                    <span className={cx('text__highlight')}>g</span>
                </p>
            </div>
            <Animation />
        </div>
    );
}

Loading.propTypes = {};
export default React.memo(Loading);
