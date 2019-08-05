import React from 'react';
import styles from './form.module.css';

const Form = ({ children, onSubmit }) => (
    <form className={styles.Form__Container} onSubmit={onSubmit}>
        {children}
    </form>
);

export default Form;
