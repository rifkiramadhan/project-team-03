import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Product.css';

function ProductEdit() {
    const params = useParams();
    const id = +params.id;
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

    const URL = 'http://localhost:3000';
    const history = useHistory();

    useEffect(() => {
        getProductById()
    }, []);

    const getProductById = async () => {
        try{
            let product = await axios ({
                method: 'GET',
                url: `${URL}/products/${id}`
            });

            setProduct(product.data);
        } catch(err){
            Swal.fire(
                'Gagal Melihat Produk!',
                `Anda gagal melihat Produk!`,
                'error'
            );
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let item = product;
        
        editProduct(item);
    };

    const editProduct = async (item) => {
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

            Swal.fire(
                `Produk Diperbaharui`,
                `Produk Anda berhasil diperbaharui`,
                'success'
            );

            history.push('/');
        } catch (error) {
            console.log(error);
        };
    };

    return (
            <div className="container">
                <h1 className="mt-20 text-center fw-bold">Edit Produk</h1>
                <form className="card-form mb-3 p-5 m-5 mt-4 row g-3 mt-20">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Name: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control rounded-pill" id="name" onChange={(e) => setProduct({...product, name: e.target.value})} value={product.name}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Description: </label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control rounded-pill" id="password" onChange={(e) => setProduct({...product, desc: e.target.value})} defaultValue={product.desc}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Price (Rp.): </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control rounded-pill" id="price" onChange={(e) => setProduct({...product, price: e.target.value})} value={product.price}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Stock : </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control rounded-pill" id="stock" onChange={(e) => setProduct({...product, stock: e.target.value})} value={product.stock}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Expire Date: </label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control rounded-pill" id="expire_date" onChange={(e) => setProduct({...product, expire_date: e.target.value})} value={product.expire_date}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Weight: </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control rounded-pill" id="weight" onChange={(e) => setProduct({...product, weight: e.target.value})} value={product.weight}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Category: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control rounded-pill" id="category" onChange={(e) => setProduct({...product, category: e.target.value})} value={product.category}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Brand: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control rounded-pill" id="brand" onChange={(e) => setProduct({...product, brand: e.target.value})} value={product.brand}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Condition: </label>
                        <div className="col-sm-10" onChange={(e) => setProduct({...product, condition: e.target.value})}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="new" checked={product.condition === "new"}/>
                                <label className="form-check-label " for="new">
                                    New
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="second" checked={product.condition === "second"}/>
                                <label className="form-check-label " for="second">
                                    Second
                                </label>
                            </div>
                            
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="refurbish" checked={product.condition === "refurbish"}/>
                                <label className="form-check-label " for="refurbish">
                                    Refurbish
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success fw-bold rounded-pill" onClick={(e) => submitHandler(e)}>Simpan</button>
                </form>
            </div>
    );
};

export default ProductEdit;