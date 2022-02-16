import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './TransactionOrder.css';

function Order() {
    const [orders, setOrders] = useState([]);
    const URL = 'http://localhost:3000';

    useEffect(() => {
        getOrderById();
    }, []);

    const getOrderById = async () => {
        try {
            const access_token = localStorage.getItem('access_token');

            let orders = await axios({
                method: 'GET',
                url: `${URL}/orders/auth`,
                headers: {
                    access_token
                },
            });

            setOrders(orders.data);
            
            // console.log(orders.data)
            // console.log(access_token)
        } catch (err) {
            Swal.fire(
                'Gagal Melihat Order Id!',
                `Anda gagal melihat Order Id!`,
                'error'
            );
        };
    };

    return (
        <div className="mt-20">
            <h1 className="text-center text-light">Order</h1>
            <table className="table table-light mt-20 text-center">
                <thead>
                    <tr>
                        <th className="table-light" scope="col">Transc No</th>
                        <th className="table-light" scope="col">Product</th>
                        <th className="table-light" scope="col">Quantity</th>
                        <th className="table-light" scope="col">Sub Total</th>
                        <th className="table-light" scope="col">Discount</th>
                        <th className="table-light" scope="col">Tax</th>
                        <th className="table-light" scope="col">Total Due</th>
                        <th className="table-light" scope="col">City</th>
                        <th className="table-light" scope="col">Address</th>
                        <th className="table-light" scope="col">Order Date</th>
                        <th className="table-light" scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            orders.map((order) => {
                                var tempExp = order.created_on.slice().split('T');
                                var order_date = tempExp[0];
                                return (
                                    <tr>
                                        <td className="table-light">{order.payt_trx_number}</td>
                                        <td className="table-light">{order.name}</td>
                                        <td className="table-light">{order.total_qty}</td>
                                        <td className="table-light">Rp. {order.subtotal}</td>
                                        <td className="table-light">Rp. {order.discount}</td>
                                        <td className="table-light">Rp. {order.tax}</td>
                                        <td className="table-light">Rp. {order.total_due}</td>
                                        <td className="table-light">{order.city}</td>
                                        <td className="table-light">{order.address}</td>
                                        <td className="table-light">{order_date}</td>
                                        <td className="table-light">{order.status}</td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
        </div>
    );
};

export default Order;
