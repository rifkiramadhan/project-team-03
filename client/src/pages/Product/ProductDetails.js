import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory, useLocation  } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ModalOrder } from '../../components';
import './Product.css';

function ProductDetails({ login }) {
    const params = useParams();
    const id = +params.id;
    const URL = 'http://localhost:3000';
    const history = useHistory();
    const location = useLocation();

    const [ product, setProduct ] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        expire_date: '',
        weight: 0,
        category: '',
        brand: '',
        condition: '',
        total_sold: 0,
        rating: 0,
        views: 0,
        User: {},        
        Products_Images: []
    });

    const [ productImages, setProductImages ] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        
        product.Products_Images.length > 0 ?
            editProductImage()
            :
            uploadImage();

        // console.log(productImages);
    };

    const editProductImage = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            let img = new FormData();
            img.append('image', productImages);

            console.log(img);
            
            await axios({
                method: 'PUT',
                url: `${URL}/productimages/update/${id}`,
                
                headers: {
                    access_token,
                    "Content-Type": "multipart/form-data"
                },
                data: img
            });

            Swal.fire(
                `Foto Produk Diperbaharui`,
                `Foto Produk Anda berhasil diperbaharui`,
                'success'
            );

            history.push('/');
        } catch (error) {
            Swal.fire(
                `Foto Gagal Diperbaharui!`,
                `Foto Produk Anda gagal diperbaharu`,
                'error'
            );
        };
    };

    const uploadImage = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            let img = new FormData();
            img.append('image', productImages);

            // console.log(img)
            
            await axios({
                method: 'POST',
                url: `${URL}/productimages/upload/${id}`,
                
                headers: {
                    access_token,
                    "Content-Type": "multipart/form-data"
                },
                data: img
            });

            Swal.fire(
                `Foto Diperbaharui`,
                `Produk Anda berhasil diperbaharui`,
                'success'
            );

            history.push(location.pathname);
        } catch (error) {
            Swal.fire(
                `Foto Gagal Diperbaharui!!`,
                `Foto Produk gagal diperbaharui`,
                'error'
            );
        };
    };
    
    const [ openModal, setOpenModal ] = useState(false);
    
    useEffect(() => {
        getProductById();
        addViews();
    }, []);

    const addViews = async () => {
        try {
            await axios ({
                method: 'PUT',
                url: `${URL}/products/updateViews/${id}`
            });
        } catch (err){
            Swal.fire(
                'Views Gagal Ditambahkan',
                `Anda gagal menambahkan Views`,
                'error'
            );
        };
    };

    const getProductById = async () => {
        try{
            let result = await axios ({
                method: 'GET',
                url: `${URL}/products/${id}`
            });

            setProduct(result.data);
        } catch(err){
            Swal.fire(
                'Gagal Melihat Produk',
                `Anda gagal melihat Produk yang dipilih`,
                'error'
            );
        };
    };

    const deleteProductHandler = (id) => {
        try {
            Swal.fire({
                title: 'Ingin Menghapus Produk ?',
                text: "Produk Anda akan dihapus dari Toko secara permanen.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oke'
            }).then((result) => {
                if (result.isConfirmed) {
                    const access_token = localStorage.getItem('access_token');

                    axios({
                        method: 'DELETE',
                        url: `${URL}/products/delete/${id}`,
                        
                        headers: {
                            access_token
                        }
                    });

                    Swal.fire(
                        'Produk Dihapus',
                        `${product.name} Berhasil dihapus dari Toko`,
                        'success'
                    );

                    history.push('/');
                };
            })
        } catch(err) {
            Swal.fire(
                'Produk Gagal Dihapus!',
                `Gagal menghapus produk dari Toko`,
                'error'
            );
        };
    };

    const actionHandler = (e) => {
        e.preventDefault();

        Swal.fire(
            'Gagal Order!',
            `Anda gagal Order Produk, silahkan Login terlebih dahulu!`,
            'error'
        );
    };

    var tempExp = product.expire_date.slice().split('T');
    var exp_date = tempExp[0];
    
    return (
        <div>
            <div className="container">
            <h1 className="mt-20 text-center fw-bold">Detail Product</h1>
                <div className="middle d-flex justify-content-center align-items-center mb-3">
                    <div className="col-md-4 col-4 mt-20">
                        <div className="card bg-light mt-20">
                            <img 
                                src = {
                                    product.Products_Images.map(image => {
                                        return `http://localhost:3000/tmp/my-uploads/${image.filename}`
                                    })
                                } 
                                className="card-img-top middle" alt=""
                            />

                            <h5 className="card-title middle mt-20 text-center">{product.name}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item bg-ligh">
                                    <div className="side-by-side">
                                        <span>Price: {product.price}</span>
                                        <span>Stock: {product.stock}</span>
                                    </div>
                                </li>
                                <li className="list-group-item bg-ligh">
                                    <div className="side-by-side">
                                        <span>Rating: {product.rating}</span>
                                        <span>Views: {product.views}</span>
                                    </div>
                                </li>
                                <li className="list-group-item bg-ligh middle">
                                    Dijual Oleh: {product.User.name}
                                </li>
                                <div className="side-by-side">
                                    {
                                        login === true ?
                                        <Link 
                                            to={`/products/edit/${id}`} 
                                            className="btn btn-info fw-bold rounded-pill"
                                        >
                                            Edit
                                        </Link>
                                        : 
                                        <Link 
                                            to={`/products/edit/${id}`} 
                                            className="btn btn-info fw-bold rounded-pill"
                                        >
                                            Edit
                                        </Link>
                                    }
                                    
                                    <button onClick={() => deleteProductHandler(id)} className="btn btn-sm btn-danger fw-bold rounded-pill">Delete</button>
                                        
                                </div>
                                {
                                    login ?
                                    <form>
                                        <div className="prod-img">
                                            <input type="file" className="form-control rounded-pill" id="image" name="image" 
                                            onChange={(e) => setProductImages(e.target.files[0])} 
                                                accept="image/*"/>
                                            <button type="submit" id="btn-upload" className="btn btn-sm btn-primary w-100 fw-bold rounded-pill" onClick={(e) => submitHandler(e)}>Submit</button>
                                        </div>
                                    </form>
                                    :
                                    <form>
                                        <div className="prod-img">
                                            <input type="file" className="form-control rounded-pill" id="image" name="image" 
                                            onChange={(e) => setProductImages(e.target.files[0])} 
                                                accept="image/*"/>
                                            <button type="submit" id="btn-upload" className="btn btn-sm btn-primary w-100 fw-bold rounded-pill" onClick={(e) => submitHandler(e)}>Submit</button>
                                        </div>
                                    </form>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-3 mt-20">
                        <div className="bg-ligh mt-20">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item bg-ligh middle">Expire Date: {exp_date}</li>
                                <li className="list-group-item bg-ligh middle">Weight: {product.weight}</li>
                                <li className="list-group-item bg-ligh middle">Category: {product.category}</li>
                                <li className="list-group-item bg-ligh middle">Brand: {product.brand}</li>
                                <li className="list-group-item bg-ligh middle">Condition: {product.condition}</li>
                                <li className="list-group-item bg-ligh middle">Total Sold: {product.total_sold}</li>
                                <li className="list-group-item bg-ligh middle">Description: {product.desc}</li>
                            </ul>
                        </div>
                        {
                            openModal
                            &&
                            <ModalOrder setOpenModal={setOpenModal} productName={product.name} productId={product.id} productPrice={product.price} productStock={product.stock}/>
                        }
                        <div id="btn-buy" className="col-sm-12 card-details">
                            <button 
                                className="btn btn-success fw-bold rounded-pill w-100 openModal" 
                                onClick={() => setOpenModal(true)}
                            >
                                Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
