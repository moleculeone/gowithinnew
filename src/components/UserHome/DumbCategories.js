import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firestore'
import CategoryCard from './CategoryCard';

const DumbCategories = ({ }) => {

  return (
    <><CategoryCard category="First Meditation" /><CategoryCard category="Guided Meditation" /><CategoryCard category="Meditation Course" /><CategoryCard category="Informational" /><CategoryCard category="Meditation Music" /><CategoryCard category="Experiences" /><CategoryCard category="Music" /></>
  );
};


export default DumbCategories;
