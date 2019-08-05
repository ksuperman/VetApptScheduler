import React from 'react';
import cs from 'classnames';
import styles from './columnlayout.module.css';

const ColumnLayout = ({ children, centerAlignContent }) => (
    <div className={styles.ColumnLayout__Container}>
        {React.Children.map(children, (child, index) => (
            <div className={cs(styles.ColumnLayout__Column, centerAlignContent && styles.ColumnLayout__ContentCenterAlign)} key={index}>
                {child}
            </div>
        ))}
    </div>
);

export default ColumnLayout;
