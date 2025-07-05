import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firestore'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import PeopleIcon from '@mui/icons-material/People';

const LevelSelection = ({ onDataSend }) => {
  const [course, setCourse] = React.useState('none');
  const [showStart, setStart] = React.useState(true);

  const onProceed = () => {
    onDataSend(course);
    setStart(false);
  }
  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  useEffect(() => {
  }, []);


  return (
    <div>

      <h2>How familiar are you with Sahaja yoga meditation.
      Choose random for more interactive experience.</h2>
      <Box class="category-box-none" style={{ marginTop: '12px', 'padding': '8px' }} sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select your familiarity Level</InputLabel>
          <Select
            labelId="demo-simple-select-label-2"
            id="demo-simple-select-2"
            value={course}
            label="Topic"
            onChange={handleCourseChange}
          >
            <MenuItem value={'1'}>Beginner</MenuItem>
            <MenuItem value={'2'}>Intermediate</MenuItem>
            <MenuItem value={'3'}>Advanced</MenuItem>
            <MenuItem value={'4'}>Random</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button style={{ marginTop: '12px' }} size="large" variant="contained" onClick={() => onProceed()}>Proceed</Button>

    </div>
  );
};


export default LevelSelection;
