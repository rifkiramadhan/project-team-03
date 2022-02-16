import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './User.css';

function UserLogin({userLogin, getToken}) {
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    const URL = 'http://localhost:3000';
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        loginUser();
    };

    const loginUser = async () => {
        try {
            const result = await axios({
                method: 'POST',
                url: `${URL}/users/login`,
                data: user
            });

            const access_token = result.data['access_token'];
            getToken(access_token);
            userLogin(true);
        
            Swal.fire(
                `Login Berhasil`,
                'Anda berhasil Login, Selamat berbelanja',
                'success'
            );
                
            history.push('/');
        
            // console.log(access_token)
        } catch (err) {
            Swal.fire(
                'Username atau password salah',
                `Username atau password Anda salah, silahkan Daftar atau Login kembali`,
                'error'
            );
        };
    };

    return (
        <div>
            <h1 className="mt-20 text-center text-dark fw-bold mt-5 pt-5">Sign In</h1>
            <div className="container container-form card-form-user p-4">
                <form className="row g-3 mt-20">
                    <div className="row mb-3 d-grid">
                        <label className="text-dark col-sm-2 fw-normal col-form-label">Email: </label>
                        <div className="col-sm-12">
                            <input type="text" className="form-control rounded-pill w-100" id="email" onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Enter your email address"/>
                        </div>
                    </div>
                    <div className="row mb-3 d-grid">
                        <label className="text-dark col-sm-2 fw-normal col-form-label">Password: </label>
                        <div className="col-sm-12">
                            <input type="password" className="form-control rounded-pill w-100" id="password" onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Your password"/>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-success fw-bold rounded-pill w-100" onClick={(e) => submitHandler(e)}>Submit</button>
                    </div>
                </form>
                <p className="text-dark mt-20 fw-light">
                    Belum punya akun ?
                    <Link className="text-dark" to="/users/register"> Register</Link>
                </p>
            </div>
        </div>
    );
};

export default UserLogin;
