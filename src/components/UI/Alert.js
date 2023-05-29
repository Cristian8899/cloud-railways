import React from 'react';
import './Alert.css';

const Alert = (props) => {
    return (
        <div className='alert'>
            <span>{props.message}</span>
            <button onClick={props.onClose} className='alert-button'>Close</button>
        </div>
    );
};

export default Alert;
