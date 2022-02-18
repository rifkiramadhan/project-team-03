import React from 'react'
import logo from '../assets/logo-codi.svg';

function Navbar() {
  return (
    <div className="container">
        <div className="navbar">
        <div className="navbar-logo">
        <img src={logo}/>
      </div>
      <div className="navbar-nav ms-auto">
        <ul>
          <li>
            <a className="nav-link" href="#">
              <i className="fa-solid fa-house me-2"></i>
              Home
            </a>
          </li>
          <li>
            <a className="nav-link" href="#">
              Medicines
            </a>
          </li>
          <li>
            <a className="nav-link" href="#">
              Pharmacy
            </a>
          </li>
          <li>
            <a className="nav-link" href="#">
              About
            </a>
          </li>
          <li>
            <a className="nav-link" href="#">
              Live Chat
            </a>
          </li>
        </ul>
        <div className="hid-nav">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
      </div>
        </div>
        </div>
  )
}

export default Navbar