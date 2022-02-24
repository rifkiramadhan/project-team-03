import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
            status: 'Success',
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
    
// Fungsi untuk menerima data dari field data API untuk form user profile
    const [ user, setUser ] = useState({
        name: '',
        birthdate: '',
        gender: '',
        avatar: '',
        type: ''
    });
    
    // Fungsi untuk menonaktifkan form modal
    const [openModal, setOpenModal] = useState(false);

    // Fungsi untuk menerima data dari url API user profile
    useEffect(() => {
        getUserById();
    }, []);

    // Fungsi untuk menjalankan api dari url API user profile
    const getUserById = async () => {

        // Jika user yang sign in tersedia
        try {
            const access_token = localStorage.getItem('access_token');

            let result = await axios({
                method: 'GET',
                url: `${URL}/users/profile`,
                
                headers: {
                    access_token
                }
            });

            // maka tampilkan data user yang sedang sign in
            setUser(result.data);
        } catch(err){

            // Jika usernya tidak melakukan sign in, maka tampilkan pesan gagal melihat profile
            Swal.fire(
                'Gagal Melihat Profile!',
                `Anda gagal melihat halaman Profile!`,
                'error'
            );
        };
    };

    return (
        <div className="container table-responsive mt-20 mb-5">
            <button 
                    type="submit" 
                    className="btn btn-success fw-bold rounded-pill" 
                    onClick={(e) => submitHandler(e)}
                >
                    Add Line Item
            </button>
            <h1 className="text-center fw-bold">Line Item</h1>
            <table className="table table-light mt-20">
                <thead>
                    <tr>
                    <th className="table-light" scope="col">Line ID</th>
                    <th className="table-light" scope="col">Status</th>
                    <th className="table-light" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lineItems.map((lineItem) => {
                            return (
                                <tr>
                                    <td className="table-light">{lineItem.id}</td>
                                    <td>
                                            { lineItem.status === 'Pending' ?
                                                <span className="badge bg-warning rounded-pill">
                                                   {lineItem.status}
                                                </span>
                                            : lineItem.status === 'Success' ?
                                                <span className="badge bg-success rounded-pill">
                                                    {lineItem.status}                   
                                                </span>
                                            : 
                                                <span className="badge bg-danger rounded-pill">
                                                    {lineItem.status}                      
                                                </span>
                                            }
                                    </td>
                                    <td className="table-light d-flex gap-2">
                                        <form>
                                            <Link className="btn btn-danger btn-sm rounded-pill">
                                                <i className="fas fa-times-circle"></i>
                                                {' '}Tolak
                                            </Link>
                                        </form>
                                        <form>
                                            <Link className="btn btn-info btn-sm rounded-pill">
                                                <i className="fas fa-check"></i>
                                                {' '}Terima
                                            </Link>
                                        </form>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default LineItem;
