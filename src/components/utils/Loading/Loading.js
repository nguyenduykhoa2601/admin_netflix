import React from 'react';
import './loading.css'
const Loading = ({text}) => {
    return (
        <div className="loading">
            <div className="loading-text">Đang upload: <span>{Math.round(text)}</span> %</div>
            <div className="loader"></div>
           
        </div>
    );
}

export default Loading;
