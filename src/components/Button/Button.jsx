import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    children,
    className,
    disabled = false,
    outline = false,
    onClick = false,
    stroke = false,
    redBtn = false,
    blackBtn = false,
    greenBtn = false,
}) {
    const classes = cx('Button', {
        outline,
        stroke,
        redBtn,
        blackBtn,
        greenBtn,
        disabled,
        [className]: className,
    });

    return (
        // <button
        //     onClick={() => {
        //         onClick && onClick();
        //     }}
        //     className={cx(classes, 'text-base', 'text-center')}
        // >
        //     {children}
        // </button>
        <button
            disabled={disabled}
            onClick={() => {
                onClick && onClick();
            }}
            className={cx(classes, 'text-base', 'text-center', 'wrapper')}
        >
            <span>{children}</span>
        </button>
    );
}

Button.propTypes = {};
export default React.memo(Button);
