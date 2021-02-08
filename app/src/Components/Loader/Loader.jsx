import React from 'react';

import './style.css';

const Loader = () => {
    return (
        <div>
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
