import React from 'react';

import './style.css';

const Loader = () => {
    return (
        <div className="loader__padding">
            <div className="overlay-loader">
                <div className="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
