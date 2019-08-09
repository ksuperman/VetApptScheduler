import React from 'react';
import cs from 'classnames';
import styles from './responsiveTable.module.css';

const ResponsiveTables = ({ data = [], columns = [] }) => (
    <div className={cs(styles.ResponsiveTable, styles[`ResponsiveTable--${columns.length}cols`], styles['ResponsiveTable--Collapse'])}>
        {
            columns.map(column => <div key={column} className={cs(styles.ResponsiveTable__Cell, styles['ResponsiveTable__Cell--Head'])}><h3>{column}</h3></div>)
        }
        {
            data.map((row = [], colIndex) => (
                row.map((rowValue, rowIndex) => (
                    <>
                        <div className={cs(styles.ResponsiveTable__Cell, styles['ResponsiveTable__Cell--Head'], styles.ResponsiveTable__Cell__CollpsedColHeader)}>{columns[rowIndex]}</div>
                        <div key={`${row}-${colIndex}-${rowIndex}`} className={cs(styles.ResponsiveTable__Cell)}>
                            {rowValue}
                        </div>
                    </>
                ))
            ))
        }
    </div>
);

export default ResponsiveTables;
