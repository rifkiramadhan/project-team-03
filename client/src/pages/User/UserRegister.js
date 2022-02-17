import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './User.css';

function UserRegister({userLogin, getToken}) {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        birthdate: '',
        gender: '',
        avatar: '',
        type: ''
    });

    const URL = 'http://localhost:3000';
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        registerUser();
    };

    const registerUser = async () => {
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

            Swal.fire(
                `Selamat Datang ${user.name}`,
                'Anda berhasil mendaftar, selamat berbelanja',
                'success'
            );
            
            history.push('/');
        } catch (err) {
            Swal.fire(
                'Daftar Akun terlebih dahulu!',
                `Silahkan Anda mendaftar Akun terlebih dahulu!`,
                'error'
            );
        };
    };

    return (
        <div>
            <h1 className="mt-20 text-center text-dark fw-bold mt-5 pt-5">Register</h1>
            <div className="container card-form-user container-form p-4 mb-5">
                <form className="row g-3 mt-20">
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
                        <div className="col-sm-12" onChange={(e) => setUser({...user, type: e.target.value})}>
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
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-success fw-bold rounded-pill w-100" onClick={(e) => submitHandler(e)}>Submit</button>
                    </div>
                </form>
                <p className="text-dark fw-medium mt-20">
                    Already got an account? Log in
                    <Link to="/users/login"> here</Link>
                </p>
            </div>
        </div>
    );
};

export default UserRegister;
