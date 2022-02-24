import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Product.css';
import { URL } from '../../utils/config';

// Fungsi untuk product edit
function ProductEdit() {
    
    // Untuk menjalankan lokasi kemana halaman akan di arahkan setelah button di klik
    const history = useHistory();

    const params = useParams();
    const id = +params.id;

    // Fungsi untuk menerima field dari url API untuk halaman edit product
    const [product, setProduct] = useState({
        name: '',
        desc: '',
        price: 0,
        stock: 0,
        expire_date: null,
        weight: 0,
        category: '',
        brand: '',
        condition: '',
        UserId: 0
    });

    // Fungsi untuk menampilkan data value pada form edit product
    useEffect(() => {
        getProductById()
    }, []);

    // Fungsi untuk menjalankan data untuk form edit product
    const getProductById = async () => {
        // Jika user yang sign in berhasil mengklik tombol edit product
        try {
            let product = await axios({
                method: 'GET',
                url: `${URL}/products/${id}`
            });

            // Maka tampilkan datanya ke dalam form edit product
            setProduct(product.data);
        } catch (err){
            // Jika gagal menerma data untuk edit product, maka akan menampilkan pesan gagal melihat produk
            Swal.fire(
                'Gagal Melihat Produk!',
                `Anda gagal melihat Produk!`,
                'error'
            );
        };
    };

    // Fungsi untuk menjalanakn button edit product
    const submitHandler = (e) => {
        e.preventDefault();
        let item = product;
        
        editProduct(item);
    };

    // Fungsi untuk membuat form edit product
    const editProduct = async (item) => {
        // Jika user yang sign in berhasil mengisi form edit product
        try {
            const access_token = localStorage.getItem('access_token');
            const { 
                name,
                desc,
                price,
                stock,
                expire_date,
                weight,
                category,
                brand,
                condition,
                UserId
            } = item;
            
            await axios({
                method: 'PUT',
                url: `${URL}/products/update/${id}`,
                
                headers: {
                    access_token
                },
                data: { 
                    name,
                    desc,
                    price,
                    stock,
                    expire_date,
                    weight,
                    category,
                    brand,
                    condition,
                    UserId
                }
            });

            // Maka akan menampilkan pesan produk berhasil diperbaharui
            Swal.fire(
                `Produk Berhasil Diperbaharui`,
                `Produk Anda berhasil diperbaharui`,
                'success'
            );
            
            // Kemudian akan di arahkan ke halaman home page
            history.push('/');
        } catch (error) {
            // Debug error
            console.log(error);
        };
    };

    return (
            <div className="container">
                <h1 className="mt-20 text-center fw-bold">Edit Produk</h1>
                <form className="card-form mb-3 p-5 m-5 mt-4 row g-3 mt-20 align-items-center justify-content-center">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Name: </label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control rounded-pill" 
                                id="name" 
                                onChange={(e) => setProduct({...product, name: e.target.value})} 
                                value={product.name}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Description: </label>
                        <div className="col-sm-10">
                            <textarea 
                                type="text" 
                                className="form-control rounded-pill" 
                                id="password" 
                                onChange={(e) => setProduct({...product, desc: e.target.value})} 
                                defaultValue={product.desc}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Price (Rp.): </label>
                        <div className="col-sm-10">
                            <input 
                                type="number" 
                                className="form-control rounded-pill" 
                                id="price" 
                                onChange={(e) => setProduct({...product, price: e.target.value})} 
                                value={product.price}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Stock: </label>
                        <div className="col-sm-10">
                            <input 
                                type="number" 
                                className="form-control rounded-pill" 
                                id="stock" 
                                onChange={(e) => setProduct({...product, stock: e.target.value})} 
                                value={product.stock}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Expire Date: </label>
                        <div className="col-sm-10">
                            <input 
                                type="date" 
                                className="form-control rounded-pill" id="expire_date" 
                                onChange={(e) => setProduct({...product, expire_date: e.target.value})} 
                                value={product.expire_date}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Weight: </label>
                        <div className="col-sm-10">
                            <input 
                                type="number" 
                                className="form-control rounded-pill" 
                                id="weight" 
                                onChange={(e) => setProduct({...product, weight: e.target.value})}
                                value={product.weight}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Category: </label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control 
                                rounded-pill" 
                                id="category" 
                                onChange={(e) => setProduct({...product, category: e.target.value})} 
                                value={product.category}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Brand: </label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control rounded-pill" 
                                id="brand" 
                                onChange={(e) => setProduct({...product, brand: e.target.value})} 
                                value={product.brand}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Condition: </label>
                        <div className="col-sm-10" onChange={(e) => setProduct({...product, condition: e.target.value})}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="Bary"/>
                                <label className="form-check-label" for="Baru">
                                    Baru
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="Bekas"/>
                                <label className="form-check-label" for="Bekas">
                                    Bekas
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="Daur Ulang"/>
                                <label className="form-check-label" for="Daur Ulang">
                                    Daur Ulang
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <button 
                                type="submit" 
                                className="btn btn-lg btn-success w-100 fw-bold rounded-pill" 
                                onClick={(e) => 
                                submitHandler(e)}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
    );
};

export default ProductEdit;