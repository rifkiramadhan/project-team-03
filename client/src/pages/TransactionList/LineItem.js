import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './LineItem.css';
import { URL } from '../../utils/config';

// Fungsi untuk membuat line item
function LineItem() {

    // Untuk menjalankan lokasi kemana halaman akan di arahkan setelah button di klik
    const history = useHistory();

    // Fungsi untuk menampilkan data lineItems, carts, product dan orders dari use state yang menerima array
    const [lineItems, setLineItems] = useState([]);
    const [carts, setCarts] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    // Fungsi untuk menampilkan line item, orders, carts, dan products yang telah di order
    useEffect(() => {
        getLineItemById();
        getOrders();
        getCarts();
        getProducts();
    }, []);

    // Fungsi untuk menampilkan order
    const getOrders = async () => {
        // Jika user yang telah melakukan sign in telah melakukan order
        try {
            let orders = await axios({
                method: 'GET',
                url: `${URL}/orders/`,
            });

            // Maka data order akan di kirim dan diperlihatkan
            setOrders(orders.data);

            // console.log(orders.data)
        } catch (err) {
            // Jika gagal maka akan menampilkan pesan gagal melihat order produk
            Swal.fire(
                'Gagal Melihat Order Produk!',
                `Anda gagal melihat Order Produk!`,
                'error'
            );
        };
    };

    // Fungsi untuk menampilkan carts
    const getCarts = async () => {
        // Jika user yang telah melakukan sign in telah melakukan order
        try {
            let carts = await axios({
                method: 'GET',
                url: `${URL}/shopping_carts/`,
            });

            // Maka data order dan carts akan di kirim dan diperlihatkan
            setCarts(carts.data);

            // console.log(carts.data)
        } catch (err) {
            // Jika gagal maka akan menampilkan pesan gagal melihat order cart
            Swal.fire(
                'Gagal Melihat Cart!',
                `Anda gagal melihat Cart Order Produk!`,
                'error'
            );
        };
    };

    // Fungsi untuk menampilkan products
    const getProducts = async () => {
        // Jika user yang telah melakukan sign in telah melakukan order
        try {
            let products = await axios({
                method: 'GET',
                url: `${URL}/products/`,
            });

            // Maka data order produk akan diperlihatkan
            setProducts(products.data);

            // console.log(products.data);
        } catch (err) {
            // Jika gagal maka akan menampilkan pesan gagal melihat produk
            Swal.fire(
                'Gagal Melihat Produk!',
                `Anda gagal melihat Produk!`,
                'error'
            );
        };
    };

    // Fungsi untuk menampilkan line item
    const getLineItemById = async () => {
        // Jika user yang telah melakukan sign in telah melakukan order
        try {
            const access_token = localStorage.getItem('access_token');

            let lineItems = await axios({
                method: 'GET',
                url: `${URL}/line_items/`,
                
                headers: {
                    access_token
                },
            });

            // Maka data yang telah di order oleh user / admin, akan terlihat pada line item
            setLineItems(lineItems.data);

            // console.log(lineItems.data)
            // console.log(access_token)
        } catch (err) {
            // Jika gagal melihat line item, maka akan menampilkan pesan gagal melihat line item produk
            Swal.fire(
                'Gagal Melihat Line Item Produk',
                `Anda gagal melihat Line Item Produk`,
                'error'
            );
        };
    };

    // Fungsi untuk membuat button add cart
    const submitHandler = (e) => {
        e.preventDefault();

        const data = {
            status: 'cart',
            ProductId: products.id, 
            ShoppingCartId: carts.id, 
            OrderId: orders.id
        };

        addLineItem(data);
    };

    // Fungsi untuk membuat add line item
    const addLineItem = async (data) => {
        // Jika line item telah di seleksi dan di submit
        try {
            const { status, ProductId, ShoppingCartId, OrderId } = data;
            const access_token = localStorage.getItem('access_token');

            await axios({
                method: 'POST',
                url: `${URL}/line_items/add`,
            
                headers: {
                    access_token
                },
                data: { status, ProductId, ShoppingCartId, OrderId }
            });

            // Maka akan menampilkan pesan line item ditambahkan
            Swal.fire(
                `Line Item Ditembahkan`,
                `Data Line Item berhasil ditambahkan`,
                'success'
            );

            // Kemudian akan di arahkan ke halaman home page
            history.push('/');

            // console.log(access_token);
        } catch (error) {
            // Jika gagal menyeleksi data line item, maka akan menampilkan pesan line item gagal ditambahkan
            Swal.fire(
                `Line Item Gagal Ditembahkan`,
                `Anda gagal menambahkan Line Item`,
                'error'
            );
        };
    };
    
    return (
        <div className="container mt-20 mb-5">
            <h1 className="text-center fw-bold">Line Item</h1>
            <table className="table table-light mt-20">
                <thead>
                    <tr>
                    <th className="table-light" scope="col">Line ID</th>
                    <th className="table-light" scope="col">Qty</th>
                    <th className="table-light" scope="col">Status</th>
                    <th className="table-light" scope="col">Product ID</th>
                    <th className="table-light" scope="col">Shop ID</th>
                    <th className="table-light" scope="col">Order Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lineItems.map((lineItem) => {
                            return (
                                <tr>
                                    <td className="table-light">{lineItem.id}</td>
                                    <td className="table-light">{lineItem.qty}</td>
                                    <td className="table-light">{lineItem.status}</td>
                                    <td className="table-light">{lineItem.ProductId}</td>
                                    <td className="table-light">{lineItem.Shopping_CartId}</td>
                                    <td className="table-light">{lineItem.order_name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <br/>
            <h4 className="text-center mt-20 fw-bold">Insert Line Item Manually</h4>
            <form className="row g-3 ">
                <select 
                    className="mb-3 rounded-pill"
                    onChange={(e) => setCarts({...carts, id: e.target.value})}
                >
                    <option disabled selected>Select Cart Id</option>
                    {
                        carts.map(cart => {
                            return (
                                <>
                                    <option value={cart.id}>{cart.id}</option>
                                </>
                            )
                        })
                    }
                </select>

                <select 
                    className="mb-3 rounded-pill"
                    onChange={(e) => setOrders({...orders, id: e.target.value})}
                >
                    <option disabled selected>Select Order Id</option>
                    {
                        orders.map(order => {
                            return (
                                <>
                                    <option value={order.id}>{order.id}</option>
                                </>
                            )
                        })
                    }
                </select>
                
                <select 
                    className="mb-3 rounded-pill"
                    onChange={(e) => setProducts({...products, id: e.target.value})}
                >
                    <option disabled selected>Select Product Id</option>
                    {
                        products.map(product => {
                            return (
                                <>
                                    <option value={product.id}>{product.id}</option>
                                </>
                            )
                        })
                    }
                </select>
                <button 
                    type="submit" 
                    className="btn btn-success fw-bold rounded-pill" 
                    onClick={(e) => submitHandler(e)}
                >
                    Add Line Item
                </button>
            </form>

        </div>
    );
};

export default LineItem;
