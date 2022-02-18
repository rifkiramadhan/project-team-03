import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Modal.css';

// Fungsi untuk membuat modal user edit
function ModalUserEdit({ setOpenModal, username, gender, birthdate, type, avatar}) {
    
    // Untuk menjalankan lokasi kemana halaman akan di arahkan setelah button di klik
    const history = useHistory();

    // Fungsi untuk menjalankan data user dari use state
    const [ user, setUser ] = useState({
        name: username,
        birthdate: birthdate,
        gender: gender,
        avatar: avatar,
        type: type
    });

    // Fungsi untuk menjalankan update user
    const submitHandler = (e) => {
        e.preventDefault();
        updateUser();
    };

    // Fungsi untuk membuat form update user
    const updateUser = async () => {
        // Jika user yang telah sign in berhasil mengedit profile
        try {
            const access_token = localStorage.getItem('access_token');
            let newUser = new FormData();

            newUser.append('name', user.name);
            newUser.append('birthdate', user.birthdate);
            newUser.append('gender', user.gender);
            newUser.append('avatar', user.avatar);
            newUser.append('type', user.type);

            await axios({
                method: 'PUT',
                url: `http://localhost:3000/users/update/`,

                headers: {
                    access_token
                },
                data: newUser
            });

            // Maka akan menampilkan pesan profile berhasil diperbaharui 
            Swal.fire(
                'Profile Berhasil Diperbaharui',
                `Profile Anda berhasil diperbaharui.`,
                'success'
            );

            // Kemudian akan di arahkan ke halaman home page
            history.push('/');

            // Serta menutup form modal
            setOpenModal(false);
        } catch (err){
            // Jika gagal maka akan menampilkan pesan profile gagal diperbaharui
            Swal.fire(
                'Profile Gagal Diperbaharui!',
                `Profile Anda gagal diperbaharui!.`,
                'error'
            );
        };
    };

    return (
        <div className="modalBackgroundProfile">
            <div className="modalContainer">

                <div className="titleCloseBtn">
                    <button className="" 
                        onClick={() => {setOpenModal(false)}}>
                        X
                    </button>
                </div>
                
                <div className="title">
                    <h2>Edit {username} Profile</h2>
                </div>
                
                <div className="body">
                    <form>
                        <div className="row mb-3">
                            <label className="form-label modal-form">Name: </label>
                            <input type="text" className="form-control rounded-pill" id="address" onChange={(e) => setUser({...user, name: e.target.value})} value={user.name}/>
                        </div>
                        <div className="row mb-3">
                            <label className="form-label modal-form">Birth date: </label>
                            <input type="date" className="form-control rounded-pill" id="total_qty" onChange={(e) => setUser({...user, birthdate: e.target.value})} value={user.birthdate}/>
                        </div>
                        <div className="row mb-3">
                            <label className="form-label modal-form">Gender: </label>
                            <input type="text" className="form-control rounded-pill" id="address" onChange={(e) => setUser({...user, gender: e.target.value})} value={user.gender}/>
                        </div>
                        <div className="row mb-3">
                            <label className=" col-sm-2 col-form-label">Type: </label>
                            <div className="col-sm-10" onChange={(e) => setUser({...user, type: e.target.value})}>
                                <div className="form-check left">
                                    <input className="form-check-input rounded-pill" type="radio" id="type" name="type" value="admin" checked={user.type === "admin"}/>
                                        Admin
                                </div>
                                <div className="form-check left">
                                    <input className="form-check-input rounded-pill" type="radio" id="type" name="type" value="user" checked={user.type === "user"}/>
                                        User
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className=" col-sm-2 col-form-label wrap">Avatar: </label>
                            <div className="col-sm-10">
                                <input type="file" className="form-control rounded-pill" id="avatar" name="avatar" onChange={(e) => setUser({...user, avatar: e.target.files[0]})} accept="image/*"/>
                            </div>
                        </div>
                        <div className="footer">
                            <button 
                                className="btn btn-success fw-bold rounded-pill"
                                onClick={(e) => submitHandler(e)}
                            >
                                Submit
                            </button>
                            <button
                                className="btn btn-danger fw-bold rounded-pill"
                                onClick={() => setOpenModal(false)}id="cancelBtn"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ModalUserEdit;