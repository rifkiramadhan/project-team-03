import React from 'react';
import './NotFound.css';

function NotFound() {
    return (
        <>
            <div className="flex-center position-ref full-height">
                <div className="code">
                    404 
                </div>
                <div className="message">
                    Halaman Tidak Ditemukan
                    <br />
                </div>
            </div>
        </>
    );
};

export default NotFound;
