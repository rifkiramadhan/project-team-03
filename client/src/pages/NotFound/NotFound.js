import React from 'react';
import './NotFound.css';

function NotFound() {
    return (
    <section class="not-found">
        <div class="container-fluid">
            <div class="text-center">

            </div>
            <div class="pt-20">
                <h2 class="text-4xl fw-bold text-center color-palette-1 mb-10">Oops! Not Found</h2>
                <p class="text-lg text-center color-palette-1 m-0">Halaman yang anda kunjungi sudah<br
                        class="d-sm-block d-none" />
                    tidak tersedia pada sistem kami dan menghubungi</p>
            </div>
            <div class="button-group d-flex flex-column mx-auto">
                <a class="btn btn-primary fw-medium text-lg text-white rounded-pill" href="/#"
                    role="button">Homepage</a>
            </div>
        </div>
    </section>
    );
};

export default NotFound;
