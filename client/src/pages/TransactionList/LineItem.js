import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './LineItem.css';

function LineItem() {
    const [lineItems, setLineItems] = useState([]);
    const history = useHistory();
    const URL = 'http://localhost:3000';

    const [carts, setCarts] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getLineItemById();
        getOrders();
        getCarts();
        getProducts();
    }, []);

    const getOrders = async () => {
        try {
            let orders = await axios({
                method: 'GET',
                url: `${URL}/orders/`,
            });

            setOrders(orders.data);

            // console.log(orders.data)
        } catch (err) {
            Swal.fire(
                'Gagal Melihat Order',
                `${err}`,
                'error'
            );
        };
    };

    const getCarts = async () => {
        try {
            let carts = await axios({
                method: 'GET',
                url: `${URL}/shopping_carts/`,
            });

            setCarts(carts.data);

            // console.log(carts.data)
        } catch (err) {
            Swal.fire(
                'Gagal Melihat Cart',
                `Anda gagal melihat Cart Item`,
                'error'
            );
        };
    };

    const getProducts = async () => {
        try {
            let products = await axios({
                method: 'GET',
                url: `${URL}/products/`,
            });

            setProducts(products.data);

            // console.log(products.data);
        } catch (err) {
            Swal.fire(
                'Gagal Melihat Produk',
                `Anda gagal melihat Produk`,
                'error'
            );
        };
    };

    const getLineItemById = async () => {
        try {
            const access_token = localStorage.getItem('access_token');

            let lineItems = await axios({
                method: 'GET',
                url: `${URL}/line_items/`,
                
                headers: {
                    access_token
                },
            });

            setLineItems(lineItems.data);

            // console.log(lineItems.data)
            // console.log(access_token)
        } catch (err) {
            Swal.fire(
                'Gagal Melihat Line Item Produk',
                `Anda gagal melihat Line Item Produk`,
                'error'
            );
        };
    };

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

    const addLineItem = async (data) => {
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

            Swal.fire(
                `Line Item Ditembahkan`,
                `Data Line Item berhasil ditambahkan`,
                'success'
            );

            history.push('/');

            // console.log(access_token);
        } catch (error) {
            Swal.fire(
                `Line Item Gagal Ditembahkan`,
                `Anda gagal menambahkan Line Item`,
                'error'
            );
        };
    };
    
    return (
        <div className="container space-enter mb-5">
            <h1 className="text-center text-light">Line Item</h1>
            <table className="table table-light space-enter">
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
            <h4 className="text-center text-light space-enter">Insert Line Item Manually</h4>
            <form className="row g-3 ">
                    <select className="mb-3 rounded-pill"
                    onChange={(e) => setCarts({...carts, id: e.target.value})}>
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

                <select className="mb-3 rounded-pill"
                onChange={(e) => setOrders({...orders, id: e.target.value})}>
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
                
                <select className="mb-3 rounded-pill"
                onChange={(e) => setProducts({...products, id: e.target.value})}>
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
                <button type="submit" className="btn btn-success fw-bold rounded-pill" onClick={(e) => submitHandler(e)}>Add Line Item</button>
            </form>

        </div>
    );
};

export default LineItem;
