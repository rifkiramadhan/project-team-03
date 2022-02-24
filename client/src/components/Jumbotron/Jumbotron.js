import React from 'react';
import './Jumbotron.css';

function Jumbotron() {
  return (
   <div className="jumbotron jumbotron-fluid mt-3" id="home">
      <div className="container">
        <h1 className="display-4">Ayo, Berobat Murah <span>Hanya</span><br/> di <span>Codi</span> Health</h1>
        <a href="/#search" className="btn telusuri btn-lg border border-primary tombol rounded-pill">Telusuri</a>
      </div>
    </div>
  );
};

export default Jumbotron;