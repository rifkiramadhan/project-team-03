import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DropdownButton, Dropdown, Navbar, Container, Nav } from 'react-bootstrap';
import './Navigation.css';
import logo from '../../assets/logo-navigation.png';

// Fungsi untuk membuat navbar
function Navigation({ login, userLogin }) {
    // Untuk menjalankan lokasi kemana halaman akan di arahkan setelah button di klik
    const history = useHistory();

    // Fungsi untuk menjalankan tombol sign in, dan sign out
    const logoutHandler = (e) => {
        e.preventDefault();
        userLogin(false);
        localStorage.clear();

        history.push('/');
    };

    // Fungsi untuk membuat gagal order
    const actionHandler = (e) => {
        e.preventDefault();

        Swal.fire(
            'Gagal Melihat Order!',
            `Anda gagal melihat seluruh Order Produk, silahkan Login terlebih dahulu!`,
            'error'
        );
    };

    return (
        <>
            <Navbar 
                bg="light" 
                variant="dark"
                sticky="top" 
                expand="sm" 
                className="navbar navbar-expand-lg"
                collapseOnSelect
            >
                <Container fluid>

                    <Navbar.Brand>
                        <Link 
                            to="/"
                            className="text-decoration-none"    
                        >    
                            <img 
                                src={logo}
                                className="rounded-circle"
                                width="40px" 
                                height="40px" 
                                alt=""
                            />
                            {' '}
                            <span className="text-dark fw-bold">Codi Health</span>
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle className="coloring" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                        <Link className="nav-link text-dark" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    {
                                        login ?
                                        <Link className="nav-link text-dark" to="/cart">Cart</Link>
                                        :
                                        <Link className="nav-link text-dark d-none" to="#"
                                        onClick={e => actionHandler(e)}>
                                            Cart
                                        </Link>
                                    }
                                </li>

                                <li className="nav-item">
                                    {
                                        login ?
                                        <Link className="nav-link text-dark" to="/line-item">Line Item</Link>
                                        :
                                        <Link className="nav-link text-dark d-none" to="#"
                                        onClick={e => actionHandler(e)}>
                                            Line Item
                                        </Link>
                                    }
                                </li>

                                <li className="nav-item">
                                    {
                                        login ?
                                        <Link className="nav-link text-dark" to="/order">Order</Link>
                                        :
                                        <Link className="nav-link text-dark d-none" to="#"
                                        onClick={e => actionHandler(e)}>
                                            Order
                                        </Link>
                                    }
                                </li>
                            </ul>
                                <DropdownButton title="Menu" variant="light" menuVariant="light">
                                {
                                    login ?
                                        <>
                                            <Dropdown.Item>
                                                <Link className="nav-link text-dark fw-medium" to="/user/profile">Profile</Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <button className="btn nav-link text-dark fw-medium"
                                                onClick={e => logoutHandler(e)}>Sign Out</button>
                                            </Dropdown.Item>
                                        </>
                                        :
                                        <>
                                            <Dropdown.Item>
                                                <Link className="nav-link text-dark fw-medium" to="/users/register">Sign Up</Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Link className="nav-link text-dark fw-medium" to="/users/login">Sign In</Link>
                                            </Dropdown.Item>
                                        </>
                                }
                            </DropdownButton>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;
