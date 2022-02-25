import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Modal.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL } from '../../utils/config';
 
function ModalOrder({ setOpenModal, productName, productId, productPrice, productStock }) {

    // Untuk menjalankan lokasi kemana halaman akan di arahkan setelah button di klik
    const history = useHistory();

    // Fungsi untuk menjalankan order dari use state yang menerima data dari order produk
    const [order, setOrder] = useState({
        name: productName,
        subtotal: 0,
        total_qty: 0,
        city: '',
        address: '',
    });

    // Fungsi untuk menjalankan add cart, add order, update sold, dan add line item
    const orderHandler = async (e) => {
        e.preventDefault();
        addCart();
        addOrder();
        updateSold();
        addLineItem();
        
        console.log(order);
    };

    // Fungsi untuk membuat update sold
    const updateSold = async () => {
        // Jika user yang telah sign in berhasil melakukan order maka sold order akan bertambah sebanyak 1x
        try {
            await axios({
                method: 'PUT',
                url: `${URL}/products/updateSold/${productId}`
            });
        } catch (err){
            // Jika tidak maka akan menampilkan pesan silahkan ii data terlebih dahulu
            Swal.fire(
                'Silahkan isi data terlebih dahulu!',
                `Anda gagal update Sold, silahkan isi data terlebih dahulu!`,
                'error'
            );
        };
    };

    // Fungsi untuk membuat add order
    const addOrder = async () => {

        // Jika user yang telah sign in berhasil melakukan order
        try {
            const access_token = localStorage.getItem('access_token');

            await axios({
                method:'POST',
                url: `${URL}/orders/add/`,
                headers: {
                    access_token
                },
                data: order
            });
            
            // console.log(access_token);
            
            // Maka akan menerima pesan berhasil order
            Swal.fire(
                'Berhasil Order',
                `${productName} Anda telah berhasil melakukan Order pembelian Produk`,
                'success'
            );

            // Kemudian akan di arahkan ke halaman order
            // history.push('/order');
        } catch(err) {
            // Jika gagal maka akan menerima pesan gagal order
            Swal.fire(
                'Gagal Order!',
                `Anda gagal melakukan Order pembelian Produk!`,
                'error'
            );
        };
    };

    // Fungsi untuk membuat add cart
    const addCart = async () => {
        // Jika user yang telah sign in berhasil melakukan order maka data akan ditambahkan ke halaman cart
        try {
            const access_token = localStorage.getItem('access_token');
            
            await axios({
                method:'POST',
                url: `${URL}/shopping_carts/add/`,
                headers: {
                    access_token
                }
            });

            console.log(access_token)
        } catch(err) {
            // Jika gagal maka aakn menampilkan pesan gagal menambahkan cart
            Swal.fire(
                'Gagal Menambahkan Cart!',
                `Anda gagal menambahkan Produk ke Cart!`,
                'error'
            );
        };
    };

    // Fungsi untuk menambahkan add line item
    const addLineItem = async () => {
        // Jika user yang telah sign in melakukan order
        try {
            const qty = order.total_qty;
            const ProductId = productId;
            const ShoppingCartId = 0;
            const OrderId = 0;
            const access_token = localStorage.getItem('access_token');
            
            await axios({
                method:'POST',
                url: `${URL}/line_items/add/`,

                headers: {
                    access_token
                },
                data: {
                    qty, ProductId, ShoppingCartId, OrderId
                }
            });
            
            // Maka akan menampilkan pesan order berhasil ditambahkan
            Swal.fire(
                'Order Berhasil Ditambahkan',
                `Anda telah berhasil menambahkan order pembelian`,
                'success'
            );
            history.push('/complete-checkout');
        } catch(err) {
            // Jika gagal maka akan menampilkan pesan order gagal ditambahkan
            Swal.fire(
                'Order Gagal Ditambahkan!',
                `Anda gagal menambahkan order pembelian!`,
                'error'
            );
        };
    };

    return (
        <div className="modalBackground container">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button 
                        onClick={() => {setOpenModal(false)}}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h5>Order Produk {productName}</h5>
                    <p>IDR. {productPrice}</p>
                </div>
                <div className="body">
                    <form>
                        <div className="row mb-3">
                            <label className="form-label modal-form">Address: </label>
                            <textarea 
                                type="text" 
                                className="form-control rounded-pill" 
                                id="address" 
                                onChange={(e) => setOrder({...order, address: e.target.value})}
                            />
                        </div>
                        <div className="row mb-3">
                            <label className="form-label modal-form">City: </label>
                            <select 
                                className="form-select rounded-pill" 
                                id="city" 
                                onChange={(e) => setOrder({...order, city: e.target.value})
                            }>
                                <option disabled selected value> -- Select City -- </option>
                                <option value="DKI Jakarta">Jakarta</option>
                                <option value="Depok">Depok</option>
                                <option value="Bogor">Bogor</option>
                                <option value="Bekasi">Bekasi</option>
                                <option value="Tangerang">Tangerang</option>
                                <option value="Tangerang">Luar Jabodetabek</option>
                                <option value="Tangerang">Luar Negri</option>
                            </select>
                        </div>
                        <div className="row mb-3">
                            <label className="form-label modal-form">Total: </label>
                            <input
                                type="number" 
                                className="form-control rounded-pill" 
                                id="total_qty" 
                                onChange={(e) => setOrder({...order, total_qty: e.target.value, subtotal: productPrice * e.target.value})}
                            />
                            <div className="form-text modal-form">Produk Stock: {productStock}</div>
                        </div>
                        <div className="row mb-3 gap-3">
                            <button 
                                className="btn btn-lg btn-success fw-bold rounded-pill"
                                onClick={(e) => orderHandler(e)}
                            >
                                Order
                            </button>
                            <button
                                className="btn btn-lg btn-danger fw-bold rounded-pill" 
                                onClick={() => setOpenModal(false)}
                                id="cancelBtn"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalOrder;