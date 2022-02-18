import React from 'react'
import image from '../assets/bear.png'

function TextHeading() {
  return (    
    <section className="bear">
    <div className="column-illustration-bear">
      <img className="il-bear" src={image} alt="" />
      <div className="column-text-heading">
        <h1 className="bear-heading">An online pharmacy
          your family can trust.</h1>
      </div>
    </div>
    </section>    
  )
}

export default TextHeading