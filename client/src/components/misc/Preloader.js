import React from 'react';

const Preloader = () => (
    <div id="preloader-wrapper">
        <svg className="circle-svg">
            <circle className="path" strokeLinecap="round" cx="150" cy="150" r="130" />
        </svg>
        <span className="blu-logo"></span>
        <span className="js-logo"></span>
    </div>
);

export default Preloader;