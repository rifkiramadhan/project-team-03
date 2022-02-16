import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { CardHome } from '../../components';
import './Home.css';

function Home({login}) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState([]);

    const URL = 'http://localhost:3000';

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let products = await axios({
                method: 'GET',
                url: `${URL}/products/`
            });

            setProducts(products.data);

            // console.log(products.data);
        } catch (err) {
            Swal.fire(
                'Gagal Melihat Produk!',
                `Anda gagal melihat Produk!`,
                'error'
            );
        };
    };

    const actionHandler = (e) => {
        e.preventDefault();
        Swal.fire(
            'Gagal Login!',
            `Username atau passwod Anda salah!`,
            'error'
        );
    };

    const loadingProducts = () => {
        return (
            <div className="text-light bg-grey">
                <p className="text-center font-weight-bold">Loading Products.. Please Wait..</p>
            </div>
        );
    };

    return (
        <div className="container mt-20 middle">

            <div className="container-fluid mt-20">
                <form className="d-flex">
                    <input className="form-control me-2 rounded-pill" type="search" placeholder="Mau cari apa ?" onChange={(e) => {setSearch(e.target.value)}}/>
                    <button className="btn btn-success fw-bold rounded-pill" type="submit">Search</button>
                </form>
            </div>
            
            <div className="container-fluid d-flex justify-content-start mt-20 ">
                {
                    login ?
                    <Link to="/products/add" className="btn btn-primary fw-bold rounded-pill">Tambah Produk</Link>
                    :
                    <Link to="/users/login" className="btn btn-info d-none" 
                    onClick={e => actionHandler(e)}>
                        Add New Product
                    </Link>
                }
            </div>
            
            <div className="row card-product">
                {
                    products.length === 0 ?
                        loadingProducts()
                        :
                        products.filter(product => {
                            if (search == ''){
                                return product;
                            } else if (product.name.toLowerCase().includes(search.toLowerCase())) {
                                return product;
                            };
                        })
                        .map(product => {
                            return (
                                <CardHome key={product.id} product={product}/>
                            )
                        })
                }
            </div>

        </div>
    );
};

export default Home;