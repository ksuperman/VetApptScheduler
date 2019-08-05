import React from 'react';
import styles from './pagelayout.module.css';

const Layout = ({ Header, Footer, children }) => (
    <div className={styles.layoutContainer}>
        {Header}
        <section>
            {children}
        </section>
        {Footer}
    </div>
);

export default Layout;
