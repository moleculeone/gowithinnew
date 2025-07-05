import React from 'react';

import lotus from '../App/img/lotus.png'

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
     
      <div style={{ marginTop: '12px', marginBottom: '4px', textAlign: 'center' }}>
        <img src={lotus} style={{ transform: 'scale(0.5)'}}></img>
       <h1 style={{ color: 'Black', margin: '0px', fontFamily: 'fantasy' }}>Go Within</h1>
        {/* <Logout setIsAuthenticated={setIsAuthenticated} /> */}
      </div>
    </header>
  );
};

export default Header;
