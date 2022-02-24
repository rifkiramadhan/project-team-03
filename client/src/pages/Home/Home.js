import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { CardHome, Footer, Information, Jumbotron, Testimonial, Time } from '../../components';
import './Home.css';
import { URL } from '../../utils/config';

// Fungsi home memiliki parameter login
function Home({ login }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState([]);

    // Menampilkan produk yang ada di home page
    useEffect(() => {
        getProducts();
    }, []);

    // Fungsi untuk menampilkan produk di home page
    const getProducts = async () => {

        // Jika berhasil menampilkan data dari route produk yang ada di home page
        try {
            let products = await axios({
                method: 'GET',
                url: `${URL}/products/`
            });

            // Maka tampilkan data produk nya ke dalam card home
            setProducts(products.data);

            // console.log(products.data);
        } catch (err) {
            // Jika gagal, maka tampilkan pesan error nya
            Swal.fire(
                'Gagal Melihat Produk!',
                `Anda gagal melihat Produk!`,
                'error'
            );
        };
    };
    
    // Fungsi untuk menambahkan data produk yang gagal di tambahkan ke halaman home page
    const actionHandler = (e) => {
        e.preventDefault();
        Swal.fire(
            'Gagal Menambahkan Produk!',
            `Anda gagal menambahkan produk baru!`,
            'error'
        );
    };

    // Fungsi untuk menjalankan spiner setiap kali ada loading
    const loadingProducts = () => {
        return (
            <div>
                <div className="loader"></div>
            </div>
        );
    };

    return (
        <div className="container-fluid">
            <Jumbotron />
            <Information />
            <Time />

            <div className="container mt-20" id="search">
                <form className="d-flex">
                    <input 
                        className="form-control me-2 rounded-pill" 
                        type="search" placeholder="Mau cari apa ?" 
                        onChange={(e) => {setSearch(e.target.value)}}/
                    >
                    <button 
                        className="btn btn-success fw-bold rounded-pill m-1" 
                        type="submit"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
            
            <div className="container-fluid d-flex justify-content-start mt-20 ">
                {/* Jika user nya sign in maka tampilkan link untuk menambahkan produk baru ke dalam home page */}
                {
                    login ?
                    <Link 
                        to="/products/add" 
                        className="btn btn-primary fw-bold rounded-pill"
                    >
                        Tambah Produk
                    </Link>
                    :
                    // Jika user nya tidak sign in maka link untuk menambahkan produk baru tidak akan ditampilkan ke home page
                    <Link className="btn btn-info d-none">
                        Tambah Produk
                    </Link>
                }
            </div>
            
            <div className="row card-product">
                {/* Jika produknya yang dicari itu kosong, maka akan menjalankan fitur loading */}
                {
                    products.length === 0 ?
                        loadingProducts()
                        :
                        products.filter(product => {
                            // Jika produknya kosong, maka akan menampilkan produk yang tidak tersedia (kosong)
                            if (search == ''){
                                return product;
                            
                            // Jika produknya yang telah dicari tersedia, maka akan menampilkan produk yang tersedia
                            } else if (product.name.toLowerCase().includes(search.toLowerCase())) {
                                return product;
                            };
                        })
                        // Jika produknya yang telah dicari tersedia, maka akan menampilkan data produk ke card home
                        .map(product => {
                            return (
                                <CardHome 
                                    key={product.id} 
                                    product={product}
                                />
                            )
                        })
                }

                <a
                    className="btn btn-primary fw-bold consul-button rounded-pill fa-solid fa-comment-medical" 
                    href="https://codigram.netlify.app"
                    target="_blank"
                    rel="noreferrer"
                >
                </a>
            </div>

            <Testimonial />
            <Footer />
        </div>
    );
};

export default Home;