import React from 'react'
import './App.css';

import { TextHeading , Navbar, AboutUs, Slider } from './components';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <TextHeading/>
      <AboutUs/>
      <Slider/>
    </div>
  );
}

export default App;
