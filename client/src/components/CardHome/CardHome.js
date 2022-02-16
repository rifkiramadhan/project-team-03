import React from 'react';
import { Link } from 'react-router-dom';
import './CardHome.css';

function CardHome(props) {
    const { 
        id,
        name, 
        price, 
        stock, 
        category,  
        rating, 
        views,
        Products_Images
    } = props.product;

    return (
        <div className="row col-lg-3 col-md-4 col-sm-6 p-5 d-block">
            <Link to={`/products/details/${id}`} className="text-decoration-none">
                <div className="card card-radius mr-2 ml-2">
                        <img 
                            src = {
                                    Products_Images.map(image => {
                                        return `http://localhost:3000/tmp/my-uploads/${image.filename}`
                                    })
                                }
                            className="card-img-top" alt=""
                        />
                    <div className="card-body bg-light">
                        <h5 className="fw-bold text-black text-length">{name}</h5>
                        <h6 className="bg-light text-secondary fw-bold pt-2 mb-4">Rp. {price}</h6>
                        <div className="side-by-side">
                            <span className="text-black prod-info text-secondary card-ratings">
                                <i className="fas fa-star text-warning"></i> {rating}
                            </span>
                            <span className="badge bg-secondary p-2 rounded-pill">
                                Views : <span class="badge bg-success">{views}</span>
                            </span>
                            <span className="badge bg-secondary p-2 rounded-pill">
                                Stock : <span class="badge bg-success">{stock}</span>
                            </span>
                            <span className="text-black prod-info text-secondary card-category mt-5">
                                <i class="fa-solid fa-bars-staggered"></i> {category}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardHome;