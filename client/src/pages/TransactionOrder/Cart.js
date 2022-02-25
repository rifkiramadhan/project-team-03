import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './TransactionOrder.css';
import { URL } from '../../utils/config';
import { Link } from 'react-router-dom';

// Fungsi untuk membuat cart
function Cart() {

    // Fungsi untuk menampilkan carts dari use state yang menerima array
    const [carts, setCarts] = useState([]);

    // Fungsi untuk menampikan order
    useEffect(() => {
        getOrderById();
    }, []);

    // Fungsi untuk melihat order
    const getOrderById = async () => {
        // Jika user yang telah sign in telah melakukan order
        try {
            const access_token = localStorage.getItem('access_token');

            let carts = await axios({
                method: 'GET',
                url: `${URL}/shopping_carts/auth`,
                
                headers: {
                    access_token
                },
            });

            // Maka data cart akan ditampilkan
            setCarts(carts.data);
            
            // console.log(carts.data)
            // console.log(access_token)
        } catch (err) {
        // Jika terjadi kesalahan, maka akan menampilkan pesan gagal melihat order
            Swal.fire(
                'Gagal Melihat Order Cart!',
                `Anda gagal melihat Order Produk!`,
                'error'
            );
        };
    };

    // Fungsi untuk menerima data dari field data API untuk form user profile
    const [ user, setUser ] = useState({
        name: '',
        type: ''
    });
    

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
            console.log(err);
        };
    };

    return (
        <div className="container table-responsive mt-20">
            <h1 className="text-center fw-bold">Cart</h1>
            <table className="table table-light mt-20">
                <thead>
                    <tr>
                        <th className="table-light" scope="col">Shop Id</th>
                        <th className="table-light" scope="col">Created On</th>
                        <th className="table-light" scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carts.map((cart) => {
                            // Fungsi untuk menampilkan cart date
                            let tempExp = cart.created_on.slice().split('T');
                            let cart_date = tempExp[0];

                            return (
                                <tr>
                                    <td className="table-light">{cart.id}</td>
                                    <td className="table-light">{cart_date}</td>
                                    <td>
                                            { cart.status === 'Pending' ?
                                                <span className="badge bg-warning rounded-pill">
                                                   {cart.status}
                                                </span>
                                            : cart.status === 'Success' ?
                                            <span className="badge bg-success rounded-pill">
                                                    {cart.status}                   
                                                </span>
                                            : 
                                            <span className="badge bg-danger rounded-pill">
                                                    {cart.status}                      
                                                </span>
                                            }
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

export default Cart;
