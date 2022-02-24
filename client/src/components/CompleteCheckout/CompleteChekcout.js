import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutSVG from './CheckoutSVG';
import './CompleteCheckout.css';

function CompleteChekcout() {
  return (
    <section className="full-height flex-center">
        <div className="container-fluid">
            <div className="text-center">
                <CheckoutSVG />
            </div>
            <div className="mt-20 mb-4">
                <h2 className="text-4xl fw-bold text-center mb-10">Checkout Berhasil</h2>
                <p className="text-lg text-center m-0">Kami akan periksa pembayaran Anda
                <br
                    className="d-sm-block d-none"
                /> dan menghubungi via WhatsApp</p>
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
                <Link 
                    className="btn btn-primary text-lg w-48 text-white rounded-pill mb-2"
                    to="/order" 
                    >My Dashboard
                </Link>
                <a 
                    className="btn btn-light text-lg w-48 rounded-pill"
                    href="https://wa.me/6282122116992?text=Saya%20sudah%20melakukan%20pembayaran%20untuk%saran%20obat"
                    target="_blank"
                    rel="noreferrer"
                    >WhatsApp Admin
                </a>
            </div>
        </div>
    </section>
  );
};

export default CompleteChekcout;