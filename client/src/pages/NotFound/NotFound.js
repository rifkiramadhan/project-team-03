import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
    <section className="not-found d-flex align-items-center justify-content-center">
        <div className="container-fluid">
            <div className="text-center">

            </div>
            <div className="pt-20">
                <h2 className="text-4xl fw-bold text-center color-palette-1 mb-10">Oops! Not Found</h2>
                <p className="text-lg text-center color-palette-1 m-0">Halaman yang anda kunjungi sudah
                    <br className="d-sm-block d-none" />
                    {' '}
                    tidak tersedia pada sistem kami 
                    <br className="d-sm-block d-none" />
                    {' '}
                    dan kami akan menghubungi annda kembali
                </p>
            </div>
            <div className="button-group d-flex flex-column mx-auto col-md-3">
                <Link className="btn btn-primary text-lg text-white rounded-pill" to="/"
                    role="button">Homepage
                </Link>
            </div>
        </div>
    </section>
    );
};

export default NotFound;
