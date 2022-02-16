import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './TransactionOrder.css';

function Cart() {
    const [carts, setCarts] = useState([]);
    const URL = 'http://localhost:3000';

    useEffect(() => {
        getOrderById();
    }, []);

    const getOrderById = async () => {
        try {
            const access_token = localStorage.getItem('access_token');

            let carts = await axios({
                method: 'GET',
                url: `${URL}/shopping_carts/auth`,
                
                headers: {
                    access_token
                },
            });

            setCarts(carts.data);
            
            // console.log(carts.data)
            // console.log(access_token)
        } catch (err) {
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            );
        };
    };

    return (
        <div className="container mt-20">
            <h1 className="text-center text-light">Cart</h1>
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
                            var tempExp = cart.created_on.slice().split('T');
                            var cart_date = tempExp[0];

                            return (
                                <tr>
                                    <td className="table-light">{cart.id}</td>
                                    <td className="table-light">{cart_date}</td>
                                    <td className="table-light">{cart.status}</td>
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
