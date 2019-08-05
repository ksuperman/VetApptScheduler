import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className='test'>
            <div className={styles.Footer__Container}>© Copyright  <span>{currentYear}</span> | Rakshith Koravadi Hatwar | All Rights Reserved </div>
        </footer>
    );
};

export default Footer;
