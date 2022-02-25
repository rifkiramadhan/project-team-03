import React from 'react';
import './Information.css';
import img1 from '../../assets/employee.png';
import img2 from '../../assets/hires.png';
import img3 from '../../assets/security.png';

function Information() {
  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-10 info-panel">

          <div className="row">
            <div className="col-sm">
              <img src={img1} alt="Employee" className="float-start" />
              <h4>24 Hours</h4>
              <p>Dapat konsultasi selama 24 jam secara daring.</p>
            </div>

            <div className="col-sm">
              <img src={img2} alt="High Res" className="float-start" />
              <h4>Fast Response</h4>
              <p>Memberikan respon keluhan secara cepat dan tepat.</p>
            </div>

            <div className="col-sm">
              <img src={img3} alt="Security" className="float-start" />
              <h4>Save Healthly</h4>
              <p>Memberikan saran obat-obatan yang berkualitas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;