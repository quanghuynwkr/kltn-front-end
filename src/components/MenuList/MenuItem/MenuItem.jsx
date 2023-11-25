import React from 'react';
import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItem({ to, children, className, outline = false, onClick = false, stroke = false }) {
    const classes = cx('MenuItem', {
        outline,
        stroke,
        [className]: className,
    });

    return (
        <NavLink
            to={to}
            onClick={() => {
                onClick && onClick();
            }}
            className={(nav) =>
                cx(
                    classes,
                    'flex',
                    'items-center',
                    'justify-center',
                    'mx-20',
                    'rounded-2xl',
                    'text-center',
                    'px-3',
                    'md:py-2',
                    'w-2/4',
                    'md:w-2/3',
                    'nav-sidebar',
                    'px-5',
                    {
                        active: nav.isActive,
                    },
                )
            }
        >
            {children}
        </NavLink>
    );
}

MenuItem.propTypes = {};
export default React.memo(MenuItem);
