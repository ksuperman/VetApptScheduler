import React from 'react';
import cs from 'classnames';
import styles from './responsiveTable.module.css';
import Typography from '../Typography';

const ResponsiveTables = ({ data = [], columns = [], heading }) => (
    <>
        <div className={cs(styles.ResponsiveTable, styles.ResponsiveTable__Heading)}>
            <Typography Element={'h2'} centerAlign={true}>{heading}</Typography>
        </div>
        <div className={cs(styles.ResponsiveTable, styles[`ResponsiveTable--${columns.length}cols`], styles['ResponsiveTable--Collapse'])}>
            {
                columns.map(column => <div key={column} className={cs(styles.ResponsiveTable__Cell, styles['ResponsiveTable__Cell--Head'])}><h3>{column}</h3></div>)
            }
            {
                data.map((row = [], colIndex) => (
                    row.map((rowValue, rowIndex) => (
                        <>
                            <div className={cs(styles.ResponsiveTable__Cell, styles['ResponsiveTable__Cell--Head'], styles.ResponsiveTable__Cell__CollpsedColHeader, ((rowIndex + 1) === row.length) && styles['ResponsiveTable__Cell--Tail'])}>{columns[rowIndex]}</div>
                            <div key={`${rowValue}-${colIndex}-${rowIndex}`} className={cs(styles.ResponsiveTable__Cell, ((rowIndex + 1) === row.length) && styles['ResponsiveTable__Cell--Tail'])}>
                                {rowValue}
                            </div>
                        </>
                    ))
                ))
            }
        </div>
    </>
);

export default ResponsiveTables;
