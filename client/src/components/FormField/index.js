import React from 'react';
import cs from 'classnames';
import styles from './formfield.module.css';

const FormField = ({ children, centerAlignContent }) => (
    <div className={cs(styles.FormField__Container, centerAlignContent && styles['FormField__Container--center'])}>
        {children}
    </div>
);

export default FormField;
