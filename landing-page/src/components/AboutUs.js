import React from 'react'
import buy from '../assets/img/buy.png'
import consul from '../assets/img/consul.png'
import cart from '../assets/img/cart.png'
import desk from '../assets/img/desk.png'



function AboutUs() {
  return (
    
    <section class="about">
      <div class="about-heading">
        <h1>Why Us?</h1>
        <p>We are always committed to providing the best for our customers.
          In addition, we also provide facilities such as:</p>
      </div>
      <div className="row-3-col">
          <div className="col">
            <img src={buy} alt="" />
            <p1>you can join as a medicine seller</p1>
          </div>
          <div className="col">
            <img src={consul} alt="" />
            <p1>we provide doctor consultation</p1>
          </div>
          <div className="col">
            <img src={cart} alt="" />
            <p1>always with competitive prices</p1>
          </div>        
      </div>
      <div classname="nurse">
        <img src={desk} alt="" />
      </div>
    </section>
  )
}

export default AboutUs