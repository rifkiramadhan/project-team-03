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

            let result = await axios({
                method: 'GET',
                url: `${URL}/users/profile`,
                
                headers: {
                    access_token
                }
            });

            setUser(result.data);
        } catch(err){
            Swal.fire(
                'Gagal Melihat Profile!',
                `Anda gagal melihat halaman Profile!`,
                'error'
            );
        };
    };

    var tempBirth = user.birthdate.slice().split('T');
    var birthdate = tempBirth[0];

    return (
        <>
            <h1 className="mt-20 text-center text-dark fw-bold mb-5">Profile</h1>
            <div className="container mt-20 mb-5">
                <div className="card card-profile card-details bg-light">
                <img src={`http://localhost:3000/${user.avatar}`} className="card-img-top mt-4 mb-5 img-thumbnail image-profile mx-auto d-block" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title text-center">{user.name}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item middle">Gender: {user.gender}</li>
                                    <li className="list-group-item middle">Birthdate: {birthdate}</li>
                                    <li className="list-group-item middle">Type: {user.type}</li>
                                </ul>
                            {
                                openModal
                                &&
                                <ModalUserEdit setOpenModal={setOpenModal} username={user.name} gender={user.gender} birthdate={birthdate} type={user.type} avatar={user.avatar}/>
                            }
                            <Link 
                                className="btn p-2 w-100 mt-5 btn-success btn-sm fw-bold rounded-pill openModal" 
                                onClick={() => setOpenModal(true)}
                            >
                                Edit Profile
                            </Link>
                        </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
