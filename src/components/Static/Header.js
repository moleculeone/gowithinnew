import React from 'react';

import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
     
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
       <h1 style={{ color: 'Black', margin: '8px', fontFamily: 'cursive' }}>Go Within</h1>
        {/* <Logout setIsAuthenticated={setIsAuthenticated} /> */}
      </div>
    </header>
  );
};

export default Header;
