import React from "react";
// import './Slider.css'
import slide1 from "../assets/img/slide-1.jpg";
import slide2 from "../assets/img/slide-2.jpg";
import slide3 from "../assets/img/slide-3.jpg";
import rightarrow from "../assets/img/right-arrow.svg";
import leftarrow from "../assets/img/left-arrow.svg";

function Slider() {
  return (
    <section className="slider">
      <div id="carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-controls">
          <div className="carousel-indicators">
            <li data-target="#carousel" data-slide-to="0" className="active">
              <img src={slide1} />
            </li>
            <li data-target="#carousel" data-slide-to="1">
              <img src={slide2} />
            </li>
            <li data-target="#carousel" data-slide-to="2">
              <img src={slide3} />
            </li>
          </div>
          <a
            className="carousel-control-prev"
            href="#carousel"
            role="button"
            data-slide="prev"
          >
            <img src={leftarrow} alt="Prev" />
          </a>
          <a
            className="carousel-control-next"
            href="#carousel"
            role="button"
            data-slide="next"
          >
            <img src={rightarrow} alt="Next" />
          </a>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slide1} />
            <div className="itemnya">
              <h2>Shop Now</h2>
            </div>
          </div>

          <div className="carousel-item">
              <img src={slide2} />
            <div className="itemnya">
              <h2>Health Tips</h2>
            </div>
          </div>

          <div className="carousel-item">
             <img src={slide3}/>
            <div className="itemnya">
              <h2>Vaccine Information</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slider;
