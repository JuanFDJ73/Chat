import React from 'react';
import { formatMessageDate } from '../../../utils/DateUtils';
import { useLanguage } from '../../../contexts/LanguageContext.jsx';
import './DateSeparator.css';

const DateSeparator = ({ date }) => {
    const { t, currentLanguage } = useLanguage();
    
    return (
        <div className="date-separator">
            <div className="date-separator-line"></div>
            <span className="date-separator-text">
                {formatMessageDate(date, t, currentLanguage)}
            </span>
            <div className="date-separator-line"></div>
        </div>
    );
};

export default DateSeparator;