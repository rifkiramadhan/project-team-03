import React from "react";
import buy from "../assets/img/buy.png";
import consul from "../assets/img/consul.png";
import cart from "../assets/img/cart.png";
import desk from "../assets/img/desk.png";
// import './AboutUs.css'

function AboutUs() {
  return (
    <section class="wrapper-grid">
      <div class="container-text-about">
        <h1>Why Us?</h1>
        <p>
          We are always committed to providing the best for our customers. In
          addition, we also provide facilities such as:
        </p>
      </div>
    <div class="container-about">
      <div class='banner-img'></div>
      <img src= {buy} alt="" />
       <p class="description">you can join as a medicine seller</p>
    </div>
    <div class="container-about">
      <div class='banner-img'></div>
      <img src= {consul} alt="" />
       <p class="description">we provide doctor consultation</p>
    </div>
    <div class="container-about">
      <div class='banner-img'></div>
      <img src= {cart} alt="" />
       <p class="description">always with competitive prices</p>
    </div>
    </section>
  );
}

export default AboutUs;
