import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './typography.module.css';

export const H1 = 'h1';

export const H2 = 'h2';

export const H3 = 'h3';

export const H4 = 'h4';

export const H5 = 'h5';

export const H6 = 'h6';

const Typography = ({
    text, Element = H1, centerAlign, capitalize = false, children,
}) => (
    <Element className={cs(styles.container, centerAlign && styles.centerAlign, capitalize && styles.capitalize)}>
        {text || children}
    </Element>
);

Typography.propTypes = {
    text: PropTypes.string,
    Element: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    centerAlign: PropTypes.bool,
    capitalize: PropTypes.bool,
};

export default Typography;
