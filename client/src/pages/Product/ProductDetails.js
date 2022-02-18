import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ModalOrder } from '../../components';
import './Product.css';

// Fungsi untuk membuat product details
function ProductDetails({ login }) {
    
    // Fungsi untuk menjalankan url API
    const URL = 'http://localhost:3000';
    
    // Untuk menjalankan lokasi kemana halaman akan di arahkan setelah button di klik
    const history = useHistory();

    const params = useParams();
    const id = +params.id;

    // Fungsi untuk menerima field dari url API untuk halaman detail produk
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

    // Fungsi untuk menampilkan produk image
    const [ productImages, setProductImages ] = useState({});

    // Fungsi untuk menjalanakn button submit update image
    const submitHandler = (e) => {
        e.preventDefault();
        
        product.Products_Images.length > 0 ?
            editProductImage()
            :
            uploadImage();

        // console.log(productImages);
    };

    // Fungsi untuk membuat edit product image
    const editProductImage = async () => {

        // Jika user yang telah sign in berhasil merubah product image
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

            // Maka tampilkan pesan foto produk diperbaharui
            Swal.fire(
                `Foto Produk Diperbaharui`,
                `Foto Produk Anda berhasil diperbaharui`,
                'success'
            );

            history.push('/');
        } catch (error) {
            // Jika user yang tidak melakukan sign in melakukan update upload foto product, maka tampilkan pesan nya
            Swal.fire(
                `Foto Gagal Diperbaharui!`,
                `Foto Produk Anda gagal diperbaharui!`,
                'error'
            );
        };
    };

    // Fungsi untuk membuat upload image
    const uploadImage = async () => {

        // Jika user yang telah melakukan sign in melakukan update upload foto product, maka tampilkan pesan nya
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

            // Maka tampilkan pesan foto berhasil diperbaharui
            Swal.fire(
                `Foto Berhasil Ditambahkan`,
                `Produk Anda berhasil ditambahkan`,
                'success'
            );

            history.push('/');
        } catch (error) {

            // Jika user yang tidak melakukan sign in melakukan upload foto product, maka tampilkan pesan nya
            Swal.fire(
                `Foto Gagal Ditambahkan!!`,
                `Foto Produk gagal ditambahkan!`,
                'error'
            );
        };
    };
    
    // Fungsi untuk menonaktifkan form modal
    const [ openModal, setOpenModal ] = useState(false);
    
    // Fungsi untuk menampilkan produk detail dan views dari pengguna yang melihat produk yang di klik
    useEffect(() => {
        getProductById();
        addViews();
    }, []);

    // Fungsi untuk membuat add views
    const addViews = async () => {
        // Jika add views berhasil dijalanakn maka akan bertambah sebanyak 1x
        try {
            await axios({
                method: 'PUT',
                url: `${URL}/products/updateViews/${id}`
            });
        } catch (err){
        // Jika add views gagal dijalanakn maka akan menampilkan pesan views gagal ditambahkan
        Swal.fire(
                'Views Gagal Ditambahkan',
                `Anda gagal menambahkan Views`,
                'error'
            );
        };
    };

    // Fungsi untuk membuat add ratings
    const addRatings = async () => {
        try {
            // Jika add ratings berhasil dijalanakn, maka akan bertambah sebanyak 1x
            await axios({
                method: 'PUT',
                url: `${URL}/products/updateRating/${id}`
            });

            // Dan menampilkan pesan rating berhasil ditambahkan
            Swal.fire(
                'Rating Berhasil Ditambahkan',
                `Anda barhasil menambahkan <b>Rating Produk:</b> <i>"${product.name}"</i>`,
                'success'
            );

            // Kemudian akan diarahkan ke halaman home page
            history.push('/');
        } catch (err){
            // Jika add ratings gagal dijalanakn, maka akan menampilkan pesan rating gagal ditambahkan!
            Swal.fire(
                'Rating Gagal Ditambahkan',
                `Anda gagal menambahkan Rating`,
                'error'
            );
        };
    };

    // Fungsi untuk membuat get product
    const getProductById = async () => {
        // Jika get product berhasil dijalanakn
        try{
            let result = await axios({
                method: 'GET',
                url: `${URL}/products/${id}`
            });

            // Maka akan menampilkan seluruh keterangan produk yang tersedia
            setProduct(result.data);
        } catch(err){
            // Jika get product gagal dijalanakn, maka akan menampilkan pesan gagal melihat produk
            Swal.fire(
                'Gagal Melihat Produk!',
                `Anda gagal melihat Produk yang dipilih!`,
                'error'
            );
        };
    };

    // Fungsi untuk membuat delete produk
    const deleteProductHandler = (id) => {
        // Jika user yang sign in menekan delete product , maka akan menjalankan pesan konfirmasi
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
                // Jika user yang sign in mengkonfirmasi delete product
                if (result.isConfirmed) {
                    const access_token = localStorage.getItem('access_token');

                    axios({
                        method: 'DELETE',
                        url: `${URL}/products/delete/${id}`,
                        
                        headers: {
                            access_token
                        }
                    });

                    // Maka sebenarnya akan menampilkan pesan produk berhasil dihapus
                    Swal.fire(
                        'Produk Berhasil Dihapus',
                        `${product.name} Berhasil dihapus dari Toko`,
                        'success'
                    );
                    
                    // Kemudian akan di arahkan ke halaman home page
                    history.push('/');
                };
            })
        } catch(err) {
            // Jika terjadi kesalahan dalam pengisian data produk maka ketika produk dihapus akan menampilkan pesan berikut
            Swal.fire(
                'Produk Gagal Dihapus!',
                `Gagal menghapus produk dari Toko`,
                'error'
            );
        };
    };

    // Fungsi untuk membuat button product gagal order produk
    const actionHandler = (e) => {
        e.preventDefault();
        // Jika user tidak melakukan sign in tetapi melakukan order produk, maka akan menampilkan pesan berikut
        Swal.fire(
            'Gagal Order!',
            `Anda gagal Order Produk, silahkan Sign In terlebih dahulu!`,
            'error'
        );
    };

    // Fungsi untuk menjalankan tanggal expired product
    let tempExp = product.expire_date.slice().split('T');
    let exp_date = tempExp[0];
    
    return (
        <>
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
                                    {/* Logic belum aktif */}
                                    {
                                        login ?
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
                                    
                                    <button 
                                        onClick={() => deleteProductHandler(id)} 
                                        className="btn btn-sm btn-danger fw-bold rounded-pill"
                                    >
                                        Delete
                                    </button>
                                        
                                </div>
                                {/* Logic belum aktif */}
                                {
                                    login ?
                                    <form>
                                        <div className="prod-img">
                                            <input 
                                                type="file" 
                                                className="form-control rounded-pill" 
                                                id="image" 
                                                name="image" 
                                                onChange={(e) => setProductImages(e.target.files[0])} 
                                                accept="image/*"
                                            />
                                            <button 
                                                type="submit" 
                                                id="btn-upload" 
                                                className="btn btn-lg btn-primary w-100 fw-bold rounded-pill" 
                                                onClick={(e) => submitHandler(e)}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                    :
                                    <form>
                                        <div className="prod-img">
                                            <input 
                                                type="file" 
                                                className="form-control rounded-pill" 
                                                id="image" 
                                                name="image" 
                                                onChange={(e) => setProductImages(e.target.files[0])} 
                                                accept="image/*"
                                            />
                                            <button 
                                                type="submit" 
                                                id="btn-upload" 
                                                className="btn btn-lg btn-primary w-100 fw-bold rounded-pill" 
                                                onClick={(e) => submitHandler(e)}
                                            >   
                                                Submit
                                            </button>
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
                            <ModalOrder 
                                setOpenModal={setOpenModal} 
                                productName={product.name} 
                                productId={product.id} 
                                productPrice={product.price} 
                                productStock={product.stock}
                            />
                        }
                        <div id="btn-buy" className="prod-img">
                            <button 
                                className="btn btn-lg btn-success fw-bold rounded-pill w-100 openModal" 
                                onClick={() => setOpenModal(true)}
                            >
                                Order
                            </button>
                        </div>
                        <button 
                            className="btn btn-secondary fw-bold rating-button text-warning rounded-pill fas fa-star" 
                            onClick={() => addRatings()}
                        >
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
