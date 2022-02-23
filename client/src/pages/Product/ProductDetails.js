import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ModalOrder } from '../../components';
import './Product.css';
import { URL } from '../../utils/config';
import { URL_IMAGE } from '../../utils/config';

// Fungsi untuk membuat product details
function ProductDetails({ login }) {
    
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
                <div className="card-details pt-5 pt-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <img 
                                src = {
                                    product.Products_Images.map(image => {
                                        return `${URL_IMAGE}/${image.filename}`
                                    })
                                } 
                                className="card-img-top rounded" 
                                alt="Foto Produk Detail"
                            />
                             <ul className="list-group list-group-flush mt-20">
                                <li className="list-group-item">
                                        <h4 className="card-title mb-4 fw-bold">{product.name}</h4>
                                       <small><i class="fa-solid fa-user-check"></i> Dijual Oleh: {product.User.name}</small>
                                </li>
                                <li className="list-group-item fw-medium">
                                    {' '}
                                    <h5><i className="fa-solid fa-money-bill-wave"></i> IDR. {product.price}</h5>
                                </li>
                                <li className="list-group-item fw-medium">
                                    <div className="d-flex gap-4">
                                        <span><i class="fa-solid fa-folder-minus"></i> {product.total_sold} Unit terjual</span>
                                        <span><i className="fa-solid fa-business-time"></i> {product.stock} Unit tersisa</span>
                                    </div>
                                </li>
                                <li className="list-group-item fw-medium">
                                    <div className="d-flex gap-4">
                                        <span><i className="fa-solid fa-star"></i> {product.rating} Kali dinilai</span>
                                        <span><i className="fa-solid fa-eye"></i> {product.views} Kali dilihat</span>
                                    </div>
                                </li>
                             </ul>
                        </div>

                        <div className="col-md-8">
                            <ul className="list-group list-group-flush">
                                <div className="row">
                                    <div className="col-md-8 mt-20">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item fw-medium">Kategori: {product.category}</li>
                                            <li className="list-group-item fw-medium">Kondisi: {product.condition}</li>
                                            <li className="list-group-item fw-medium">Brand: {product.brand}</li>
                                            <li className="list-group-item fw-medium">Berat Barang: {product.weight}</li>
                                            <li className="list-group-item fw-medium">Expire Date: <i>{exp_date}</i></li>
                                        </ul>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item fw-medium">{product.desc}</li>                                
                                        </ul>
                                    </div>
                                    {
                                        login ?
                                            <button 
                                                className="btn btn-secondary fw-bold rating-button text-warning rounded-pill fas fa-star" 
                                                onClick={() => addRatings()}
                                            >
                                            </button>
                                        :
                                            <button 
                                                className="btn btn-secondary fw-bold rating-button text-warning rounded-pill fas fa-star d-none" 
                                                onClick={() => addRatings()}
                                            >
                                            </button>
                                    }
                                </div>
                        
                                <div className="d-flex gap-2 m-3">
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
                                            className="btn btn-info fw-bold rounded-pill d-none"
                                        >
                                            Edit
                                        </Link>
                                    }
                                    
                                    {
                                        login ?    
                                            <button 
                                                onClick={() => deleteProductHandler(id)} 
                                                className="btn btn-sm btn-danger fw-bold rounded-pill"
                                            >
                                                Delete
                                            </button>
                                        :
                                            <button 
                                                onClick={() => deleteProductHandler(id)} 
                                                className="btn btn-sm btn-danger fw-bold rounded-pill d-none"
                                            >
                                                Delete
                                            </button>
                                    }

                                </div>
                                {/* Logic belum aktif */}
                                <form>
                                {
                                    login ?
                                    <div className="">
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
                                    :
                                    <div className="">
                                        <input 
                                            type="file" 
                                            className="form-control rounded-pill d-none" 
                                            id="image" 
                                            name="image" 
                                            onChange={(e) => setProductImages(e.target.files[0])} 
                                            accept="image/*"
                                        />
                                        <button 
                                            type="submit" 
                                            id="btn-upload" 
                                            className="btn btn-lg btn-primary w-100 fw-bold rounded-pill d-none" 
                                            onClick={(e) => submitHandler(e)}
                                        >   
                                            Submit
                                        </button>
                                    </div>
                                }

                                </form>
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
                                <div id="btn-buy" className="">
                                    <button 
                                        className="btn btn-lg btn-success fw-bold rounded-pill w-100 openModal" 
                                        onClick={() => setOpenModal(true)}
                                        key={id}
                                    >
                                        Order
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
