import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ModalUserEdit } from '../../components';
import './User.css';

function UserProfile() {
    const [ user, setUser ] = useState({
        name: '',
        birthdate: '',
        gender: '',
        avatar: '',
        type: ''
    });
    
    const [openModal, setOpenModal] = useState(false);
    
    const URL = 'http://localhost:3000';

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        try {
            const access_token = localStorage.getItem('access_token');

            let result = await axios ({
                method: 'GET',
                url: `${URL}/users/profile`,
                
                headers: {
                    access_token
                }
            });

            setUser(result.data);
        } catch(err){
            Swal.fire(
                'Gagal Melihat Profile',
                `Anda gagal melihat halaman Profile`,
                'error'
            );
        };
    };

    var tempBirth = user.birthdate.slice().split('T');
    var birthdate = tempBirth[0];

    return (
        <div className="container mt-20 mb-5">
            <h1 className="mt-20 text-center text-dark fw-bold mb-5">Profile</h1>
            <div className="middle">
                <div className="card card-details bg-light">
                    <img src={`http://localhost:3000/${user.avatar}`} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item middle">Gender: {user.gender}</li>
                                    <li className="list-group-item middle">Birthdate: {birthdate}</li>
                                    <li className="list-group-item middle">Type: {user.type}</li>
                                    {
                                        openModal
                                        &&
                                        <ModalUserEdit setOpenModal={setOpenModal} username={user.name} gender={user.gender} birthdate={birthdate} type={user.type} avatar={user.avatar}/>
                                    }
                                    <Link 
                                        className="btn btn-primary btn-sm fw-bold rounded-pill openModal" 
                                        onClick={() => setOpenModal(true)}
                                    >
                                        Edit Profile
                                    </Link>
                                </ul>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
