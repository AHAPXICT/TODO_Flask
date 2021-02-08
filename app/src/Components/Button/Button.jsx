import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

const Button = ({ children, mode, className, ...props }) => {
    const classNames = classnames('button', {
        [`button--${mode}`]: Boolean(mode),
        className,
    });

    return (
        <button className={classNames} {...props}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    mode: 'primary',
};

Button.propTypes = {
    mode: PropTypes.oneOf(['primary', 'danger', 'warning', 'secondary']),
};

export default Button;
