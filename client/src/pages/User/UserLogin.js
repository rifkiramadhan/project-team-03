import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './User.css';

// Fungsi untuk melakukan sign in
function UserLogin({ userLogin, getToken }) {
    // Fungsi untuk menjalankan url API
    const URL = 'http://localhost:3000';

    // Untuk menjalankan lokasi kemana halaman akan di arahkan setelah button di klik
    const history = useHistory();

    // Fungsi untuk menerima dari field url API untuk user dan password
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    // Fungsi untuk menjalankan button sign in
    const submitHandler = e => {
        e.preventDefault();
        loginUser();
    };

    // Fungsi untuk menjalankan dan mengirim data dari button sign in setelah button nya di klik
    const loginUser = async () => {

        // Jika berhasil sign in
        try {
            const result = await axios({
                method: 'POST',
                url: `${URL}/users/login`,
                data: user
            });

            const access_token = result.data['access_token'];
            getToken(access_token);
            userLogin(true);
        
            // Maka jalankan perintah sign in berhasil
            Swal.fire(
                `Sign In Berhasil`,
                'Anda berhasil melakukan Sign In, Selamat berbelanja',
                'success'
            );
            
            // Dari form sign in akan di kirim ke halaman home page untuk user / admin
            history.push('/');
        
            // console.log(access_token)
        } catch (err) {
            // Jika gagal sign in, maka akan menampilkan pesan sign in gagal dan tetap berada di halaman sign in
            Swal.fire(
                'Sign In Gagal!',
                `Username atau password Anda salah, silahkan Daftar atau Masuk kembali!`,
                'error'
            );
        };
    };

    return (
        <>
            <h1 className="mt-20 text-center text-dark fw-bold mt-5 pt-5">Sign In Account</h1>
            <div className="container container-form card-form-user p-4">
                <form className="row g-3 mt-20 align-items-center justify-content-center">
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
                    <div className="row mt-3 d-grid">    
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-lg btn-success fw-bold rounded-pill w-100" onClick={(e) => submitHandler(e)}>Sign In</button>
                        </div>
                        <p className="mt-20">
                            Belum memiliki akun ?
                            <Link 
                                to="/users/register"
                                className="fw-bold text-secondary text-decoration-none"
                            > Sign Up Here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UserLogin;
