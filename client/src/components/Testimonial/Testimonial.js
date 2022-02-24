import React from 'react';
import { Figure } from 'react-bootstrap';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import './Testimonial.css';

function Testimonial() {
  return (
    <section className="testimonial" id="testimoni">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h5>" Berobatlah disaat kamu sakit, karena berobat itu sehat dan membuat harimu jadi vit dan enjoy lagi. "</h5>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6 justify-content-center d-flex">
          <Figure className="figure">
            <img src={img1} className="figure-img img-fluid rounded-circle" alt="Testi 1" />
          </Figure>

          <Figure className="figure">
            <img src={img2} className="figure-img img-fluid rounded-circle utama" alt="Testi 2" />
            <Figure.Caption className="figure-caption">
              <h5>Syafna Adinda</h5>
              <p>Dr. Specialist Mata</p>
            </Figure.Caption>
          </Figure>

          <Figure className="figure">
            <img src={img3} className="figure-img img-fluid rounded-circle" alt="Testi 3" />
          </Figure>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;