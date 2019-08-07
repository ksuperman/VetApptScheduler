import React from 'react';
import Button from '../Button';
import styles from './banner.module.css';

const Banner = ({ buttons = [] }) => (
    <div className={styles.BANNER__Container}>
        <h1 className={styles.BANNER__h1}>All you need to do is show <span>up at the right time.</span></h1>
        <h2 className={styles.BANNER__h2}>Vets Scheduling is your online portal to host of pet services.</h2>
        {buttons.map(({ ...props }, index) => <Button key={`button-${index}`} className={styles.BANNER__AccountActionButton} {...props} />)}
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p className={styles.BANNER__Note}>It's easy &amp; user-friendly. No credit card or commitments. <span>We promise you’ll love it!</span></p>
    </div>
);

export default Banner;
