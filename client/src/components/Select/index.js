import React from 'react';
import cs from 'classnames';
import styles from './select.module.css';

const Select = ({
    options = [], name, multiple = false, size, label, onChange,
}) => (
    <>
        <select className={cs(styles.Select__Container, multiple && styles['Select__Container--multiple'])} required multiple={multiple} size={size} onChange={onChange}>
            {options.map((option, index) => <option key={`option-${name}-${index}`} value={option.value}>{option.name}</option>)}
        </select>
        { label && <label className={styles.Select__InputPlaceholder} htmlFor={name}>{label}</label> }
    </>
);

export default Select;
