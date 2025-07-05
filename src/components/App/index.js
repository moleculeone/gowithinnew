import React, { useState, useEffect } from 'react';

import Login from '../Login';
import UserHome from '../UserHome';
import Static from '../Static';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  return (
    <>
        <UserHome setIsAuthenticated={setIsAuthenticated} />
    </>
  );
};

export default App;
