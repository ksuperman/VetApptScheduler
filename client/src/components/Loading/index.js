import React from 'react';
import cs from 'classnames';
import Spinner from '../Spinner';
import styles from './loading.module.css';

const Loading = ({ className }) => (
    <div className={cs(styles.Loading__Container, className)}>
        <Spinner />
    </div>
);

export default Loading;
