import React from 'react';
import styles from './inputfield.module.css';

const Input = ({
    id, type, name, label, onChange, value,
}) => (
    <>
        <input type={type} id={id} name={name} value={value} className={styles.InputField__Input} required onChange={onChange} />
        { label && <label className={styles.InputField__InputPlaceholder} htmlFor={name}>{label}</label> }
    </>
);

export default Input;
