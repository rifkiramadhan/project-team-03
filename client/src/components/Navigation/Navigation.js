import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DropdownButton, Dropdown, Navbar, Container, Nav } from 'react-bootstrap';
import './Navigation.css';
import logo from '../../assets/logo-navigation.png';
import { URL } from '../../utils/config';
import axios from 'axios';

// Fungsi untuk membuat navbar
function Navigation({ login, userLogin }) {
    // Untuk menjalankan lokasi kemana halaman akan di arahkan setelah button di klik
    const history = useHistory();

    // Fungsi untuk menjalankan text-uppercase sign in, dan sign out
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
        <>
            <Navbar 
                bg="light" 
                variant="light"
                sticky="top" 
                expand="sm" 
                className="navbar navbar-expand-lg"
                collapseOnSelect
            >
                <Container fluid>

                    <Navbar.Brand>
                        <a 
                            href="/#home"
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
                        </a>
                    </Navbar.Brand>

                    <Navbar.Toggle className="coloring" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link 
                                        className="nav-link text-dark text-uppercase" 
                                        to="/"
                                    > Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a 
                                        className="nav-link text-dark text-uppercase" 
                                        href="https://codigram.netlify.app"
                                        target="_blank"
                                        rel="noreferrer"
                                    > Konsultasi
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a 
                                        className="nav-link text-dark text-uppercase" 
                                        href="#testimoni"
                                    > Testimoni
                                    </a>
                                </li>
                                {
                                    login ?
                                        <li>
                                            <Link 
                                                className="d-none" 
                                            > 
                                            </Link>
                                        </li>
                                    :
                                    <>
                                        <li class="nav-item">                                            
                                            <Link 
                                                className="nav-link text-dark fw-medium text-uppercase"
                                                to="/users/register"
                                            > Sign Up
                                            </Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link 
                                                className="btn btn-primary fw-bold w-100 text-uppercase rounded-pill"
                                                to="/users/login"
                                            > Sign In
                                            </Link>
                                        </li>
                                    </> 
                                }
                                <li className="nav-item">
                                    {
                                        login ?
                                        <Link 
                                            className="nav-link text-dark text-uppercase"
                                            to="/cart"
                                        > Cart
                                        </Link>
                                        :
                                        <Link 
                                            className="nav-link text-dark text-uppercase d-none" 
                                            onClick={e => actionHandler(e)}
                                        >Cart
                                        </Link>
                                    }
                                </li>

                                <li className="nav-item">
                                    {
                                        login && user.type === 'admin' ?
                                        <Link 
                                            className="nav-link text-dark text-uppercase" 
                                            to="/line-item"
                                        >Line Item
                                        </Link>
                                        :
                                        <Link 
                                            className="nav-link text-dark text-uppercase d-none" 
                                            to="/"
                                            onClick={e => actionHandler(e)}
                                        >Line Item
                                        </Link>
                                    }
                                </li>

                                <li className="nav-item">
                                    {
                                        login ?
                                        <Link className="nav-link text-dark text-uppercase" 
                                              to="/order"
                                        >Order
                                        </Link>
                                        :
                                        <Link 
                                            className="nav-link text-dark d-none text-uppercase" 
                                            to="/#"
                                            onClick={e => actionHandler(e)}
                                        >Order
                                        </Link>
                                    }
                                </li>
                            </ul>
                                {
                                    login ?
                                    <DropdownButton className="text-uppercase" title={`Hello, ${user.name}`} variant="light" menuVariant="light">
                                        <>
                                            <Dropdown.Item>
                                                <Link 
                                                    className="nav-link text-dark fw-medium text-uppercase" 
                                                    to="/user/profile"
                                                > Profile
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <button 
                                                    className="btn nav-link text-dark fw-medium text-uppercase"
                                                    onClick={e => logoutHandler(e)}
                                                > Sign Out
                                                </button>
                                            </Dropdown.Item>
                                        </>
                                    </DropdownButton>
                                        :

                                        <>
                                            <Dropdown.Item className="d-none">
                                                <Link 
                                                    className="nav-link text-dark fw-medium text-uppercase d-none" 
                                                    to="/users/register"
                                                >Sign Up
                                                </Link>
                                            </Dropdown.Item>
                                        </>
                                }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;
