import React from 'react';
import { formatMessageDate } from '../../../utils/DateUtils';
import './DateSeparator.css';

const DateSeparator = ({ date }) => {
    return (
        <div className="date-separator">
            <div className="date-separator-line"></div>
            <span className="date-separator-text">
                {formatMessageDate(date)}
            </span>
            <div className="date-separator-line"></div>
        </div>
    );
};

export default DateSeparator;