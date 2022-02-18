import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Product.css';

// Fungsi untuk membuat product add
function ProductAdd() {

    // Fungsi untuk menjalankan url API
    const URL = 'http://localhost:3000';
    
    // Untuk menjalankan lokasi kemana halaman akan di arahkan setelah button di klik
    const history = useHistory();

    // Fungsi untuk menerima field dari url API untuk form tambah produk
    const [product, setProduct] = useState({
        name: '',
        desc: '',
        price: 0,
        expire_date: '',
        weight: 0,
        category: '',
        brand: '',
        condition: ''
    });

    // Fungsi untuk menjalankan tambah produk
    const submitHandler = (e) => {
        e.preventDefault();
        addProduct();

        // console.log(product);
    };

    // Fungsi untuk membuat add produk
    const addProduct = async () => {

        // Jika user yang sign in menekan tombol button
        try {
            const access_token = localStorage.getItem('access_token');

            await axios({
                method: 'POST',
                url: `${URL}/products/add`,

                headers: {
                    access_token
                },
                data: product
            });
            
            // Maka akan menampilkan pesan produk berhasil ditambahkan
            Swal.fire(
                `Produk Berhasil Diitambahkan!`,
                `Produk Anda berhasil ditambahkan`,
                'success'
            );

            // Dari form tambah produk akan di kirim ke halaman home page untuk user / admin
            history.push('/');

            // console.log(access_token)
        } catch (error) {
            // Jika user yang tidak sigin in menekan tombol button, maka akan menampilkan pesan produk gagal ditambahkan
            Swal.fire(
                `Produk Gagal Ditambahkan!!`,
                `Anda gagal menambahkan Produk!`,
                'error'
            );
        };
    };
    
    return (
        <div>
            <div className="container">
                <h1 className="mt-20 text-center fw-bold">Tambah Produk</h1>
                <form className="card-form mb-3 p-5 m-5 mt-4 row g-3 mt-20 align-items-center justify-content-center">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Name: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control rounded-pill" id="name" onChange={(e) => setProduct({...product, name: e.target.value})} placeholder="Product Name"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Description: </label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control rounded-pill" id="password" onChange={(e) => setProduct({...product, desc: e.target.value})} placeholder="Product Description"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Price (Rp.): </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control rounded-pill" id="price" onChange={(e) => setProduct({...product, price: e.target.value})} placeholder="Rp."/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Expire Date: </label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control rounded-pill" id="expire_date" onChange={(e) => setProduct({...product, expire_date: e.target.value})} placeholder="Expire Date"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Weight (kg): </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control rounded-pill" id="price" onChange={(e) => setProduct({...product, weight: e.target.value})} placeholder="kg"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Category: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control rounded-pill" id="category" onChange={(e) => setProduct({...product, category: e.target.value})} placeholder="Product Category"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Brand: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control rounded-pill" id="brand" onChange={(e) => setProduct({...product, brand: e.target.value})} placeholder="Product Brand"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Condition: </label>
                        <div className="col-sm-10" onChange={(e) => setProduct({...product, condition: e.target.value})}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="new"/>
                                <label className="form-check-label " for="New">
                                    New
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="second"/>
                                <label className="form-check-label " for="Second">
                                    Second
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="refurbish"/>
                                <label className="form-check-label " for="Refurbish">
                                    Refurbish
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-lg btn-success fw-bold rounded-pill w-100" onClick={(e) => submitHandler(e)}>Tambahkan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductAdd;
