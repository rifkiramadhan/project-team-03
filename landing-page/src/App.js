import React from 'react'
import './App.css';
import { TextHeading , Navbar, AboutUs } from './components';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <TextHeading></TextHeading>
      <AboutUs></AboutUs>
    </div>
  );
}

export default App;
