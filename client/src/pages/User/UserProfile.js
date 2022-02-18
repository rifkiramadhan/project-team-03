import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ModalUserEdit } from '../../components';
import './User.css';

// Fungsi untuk membuat user profile
function UserProfile() {

    // Fungsi untuk menjalankan url API
    const URL = 'http://localhost:3000';

    // Fungsi untuk menerima data dari field data API untuk form user profile
    const [ user, setUser ] = useState({
        name: '',
        birthdate: '',
        gender: '',
        avatar: '',
        type: ''
    });
    
    // Fungsi untuk menonaktifkan form modal
    const [openModal, setOpenModal] = useState(false);

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

            // Jika usernya tidak melakukan sign in, maka tampilkan pesan gagal melihat profile
            Swal.fire(
                'Gagal Melihat Profile!',
                `Anda gagal melihat halaman Profile!`,
                'error'
            );
        };
    };

    // Fungsi untuk menjalankan tanggal lahir user profile
    let tempBirth = user.birthdate.slice().split('T');
    let birthdate = tempBirth[0];

    return (
        <>
            <h1 className="mt-20 text-center text-dark fw-bold mb-5">Profile</h1>
            <div className="container mt-20 mb-5">
                <div className="card card-profile card-details bg-light">
                    <img src={`http://localhost:3000/${user.avatar}`} 
                         className="card-img-top mt-4 mb-5 img-thumbnail image-profile mx-auto d-block" 
                         alt=""/>
                        <div className="card-body">
                            <h5 className="card-title text-center">{user.name}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item middle">Gender: {user.gender}</li>
                                    <li className="list-group-item middle">Birthdate: {birthdate}</li>
                                    <li className="list-group-item middle">Type: {user.type}</li>
                                </ul>
                            {/* Jika button edit profile di klik, maka tampilkan form modal untuk edit prile */}
                            <Link 
                                className="btn p-2 w-100 mt-5 btn-success btn-sm fw-bold rounded-pill openModal" 
                                onClick={() => setOpenModal(true)}
                            >
                                Edit Profile
                            </Link>
                            {
                                openModal
                                &&
                                <ModalUserEdit 
                                    setOpenModal={setOpenModal} 
                                    username={user.name} 
                                    gender={user.gender} 
                                    birthdate={birthdate} 
                                    type={user.type} 
                                    avatar={user.avatar}
                                />
                            }
                        </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
