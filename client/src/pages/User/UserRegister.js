import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './User.css';
import { URL } from '../../utils/config';

// Fungsi untuk membuat register akun
function UserRegister({userLogin, getToken}) {
    
    // Untuk menjalankan lokasi kemana halaman akan di arahkan setelah button di klik
    const history = useHistory();

    // Fungsi untuk menerima data dari field data API untuk form input pada register akun
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        birthdate: '',
        gender: '',
        avatar: '',
        type: ''
    });

    // Fungsi untuk menjalankan button sign up
    const submitHandler = (e) => {
        e.preventDefault();
        registerUser();
    };

    // Fungsi untuk menjalankan dan mengirim data dari button sign up setelah button nya di klik
    const registerUser = async () => {

        // Jika data nya berhasil di kirim
        try {
            let newUser = new FormData();

            newUser.append('name', user.name);
            newUser.append('email', user.email);
            newUser.append('password', user.password);
            newUser.append('birthdate', user.birthdate);
            newUser.append('gender', user.gender);
            newUser.append('avatar', user.avatar);
            newUser.append('type', user.type);

            let result = await axios({
                method: 'POST',
                url: `${URL}/users/register`,

                data: newUser,
                header: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const access_token = result.data['access_token'];
            getToken(access_token);
            userLogin(true);

            // Maka akan menampilkan pesan selamat datang 
            Swal.fire(
                `Selamat Datang ${user.name}`,
                'Anda berhasil mendaftar Akun, selamat berbelanja',
                'success'
            );
            
            // Dari form sign in akan di kirim ke halaman home page untuk user / admin
            history.push('/');
        } catch (err) {
            // Jika data nya gagal di kirim, maka akan menampilkan pesan daftar akun terlebih dahulu
            Swal.fire(
                'Daftar Akun terlebih dahulu!',
                `Silahkan Anda mendaftar Akun terlebih dahulu!`,
                'error'
            );
        };
    };

    return (
            <>
                <h1 className="mt-20 text-center text-dark fw-bold mt-5 pt-5">Sign Up Account</h1>
                <div className="container card-form-user container-form p-4 mb-5">
                    <form className="row g-3 mt-20 align-items-center justify-content-center">
                        <div className="row mb-3 d-grid">
                            <label className="text-dark fw-medium col-sm-2 col-form-label">Username: </label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control rounded-pill w-100" id="name" onChange={(e) => setUser({...user, name: e.target.value})} placeholder="Enter your username"/>
                            </div>
                        </div>
                        <div className="row mb-3 d-grid">
                            <label className="text-dark fw-medium col-sm-2 col-form-label">Email: </label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control rounded-pill w-100" id="email" onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Your email"/>
                            </div>
                        </div>
                        <div className="row mb-3 d-grid">
                            <label className="text-dark fw-medium col-sm-2 col-form-label">Password: </label>
                            <div className="col-sm-12">
                                <input type="password" className="form-control rounded-pill w-100" id="password" onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Your password"/>
                            </div>
                        </div>
                        <div className="row mb-3 d-grid">
                            <label className="text-dark fw-medium col-sm-2 col-form-label">Birthdate: </label>
                            <div className="col-sm-12">
                                <input type="date" className="form-control rounded-pill w-100" id="birthdate" onChange={(e) => setUser({...user, birthdate: e.target.value})}/>
                            </div>
                        </div>
                        <div className="row mb-3 d-grid">
                            <label className="text-dark fw-medium col-sm-2 col-form-label">Gender: </label>
                            <div className="col-sm-12" onChange={(e) => setUser({...user, gender: e.target.value})}>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="gender" name="gender" value="Male"/>
                                    <label className="form-check-label text-dark fw-medium" for="Male">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="gender" name="gender" value="Female"/>
                                    <label className="form-check-label text-dark fw-medium" for="Female">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3 d-grid">
                            <label className="text-dark fw-medium col-sm-2 col-form-label">Avatar: </label>
                            <div className="col-sm-12">
                                <input type="file" className="form-control rounded-pill w-100" id="avatar" name="avatar" onChange={(e) => setUser({...user, avatar: e.target.files[0]})} accept="image/*"/>
                            </div>
                        </div>
                        <div className="row mb-3 d-grid">
                            <label className="text-dark fw-medium col-sm-2 col-form-label">Type: </label>
                            <div className="col-sm-12">
                                <div onChange={(e) => setUser({...user, type: e.target.value})}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="type" name="type" value="admin"/>
                                        <label className="form-check-label text-dark fw-medium" for="admin">
                                            Admin
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="type" name="type" value="user"/>
                                        <label className="form-check-label text-dark fw-medium" for="user">
                                            User
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row d-grid mt-5">
                            <div className="col-sm-12">
                                <button type="submit" className="btn btn-lg btn-success fw-bold rounded-pill w-100" onClick={(e) => submitHandler(e)}>Sign Up</button>
                            </div>
                            <p className="fw-medium mt-20">
                                Sudah memiliki akun ?
                                <Link 
                                    to="/users/login"
                                    className="fw-bold text-secondary text-decoration-none"
                                > Sign In Here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </>
    );
};

export default UserRegister;
