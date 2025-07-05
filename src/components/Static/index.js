import React, { useState, useEffect } from 'react';
import '../App/App.css'
import Header from './Header';
import LevelSelection from './LevelSelection';
import DumbCategories from './DumbCategories';
import SmartCategories from './SmartCategories';

const Static = ({ setIsAuthenticated }) => {
  const [level, setLevel] = useState(0);

  useEffect(() => {
  }, [level]);

  const handleLevelSelection = (data) => {
    setLevel(Number(data));
  };

  return (
    <div className={'container '}>

      <Header
       
        setIsAuthenticated={setIsAuthenticated}
      />

      {
        level > 0 && level <= 3
          ?
           <DumbCategories />
          :
          level == 4
            ?
            <DumbCategories />
            :
            <LevelSelection onDataSend={handleLevelSelection}></LevelSelection>
      }
      {
        <SmartCategories level={level}></SmartCategories>
      }

    </div>
  );
};

export default Static;
