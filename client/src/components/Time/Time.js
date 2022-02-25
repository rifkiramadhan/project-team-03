import React from 'react';
import './Time.css';

const today = new Date();
const day = today.toDateString();

function Time() {
  return (
    <div className="main-hero-image mt-5">
        <div className="main-hero-text">
            <h1>{day}</h1>
        </div>
    </div>
  );
};

export default Time;