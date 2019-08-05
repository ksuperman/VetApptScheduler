import React from 'react';
import cs from 'classnames';
import styles from './button.module.css';

const Button = ({ className, disabled, ...props }) => (
    <button className={cs(styles.Button, className, disabled && styles['Button--disabled'])} disabled={disabled} {...props}></button>
);

export default Button;
