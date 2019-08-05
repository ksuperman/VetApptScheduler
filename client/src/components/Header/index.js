import React from 'react';
import Button from '../Button';
import styles from './header.module.css';

const Header = ({ buttons = [] }) => (
    <header className={styles.Header__Container}>
        <div className={styles.Header__Wrapper}>
            <div className={styles.Header__Row}>
                <div className={styles.Header__Column}>
                    <div className={styles.Header__CompanyLogoContainer}>
                        <a href="/#"><img className={styles.Header__CompanyLogo} src="images/company_logo.png" alt=""/></a>
                    </div>
                </div>
                <div className={styles.Header__Column}>
                    <div className={styles.Header_AccountActionButton_Container}>
                        {buttons.map(({ ...props }, index) => <Button key={`button-${index}`} className={styles.Header__ActionButton} {...props} />)}
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default Header;
