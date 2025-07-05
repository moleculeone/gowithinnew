import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from '../../config/firestore'
import CategoryCard from './CategoryCard';
import Smartcard from "./Smartcard";

const SmartCategories = ({ userLevel }) => {

  const [posts, setPosts] = useState();
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, "posts"), where("level", "==", userLevel.toString()));
      const querySnapshot = await getDocs(q);
      const returnedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      shuffle(returnedPosts);
      setPosts(returnedPosts);
    }

    fetchData();

    const shuffle = a => {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
    };

    
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      const distances = sectionRefs.current.map((ref) => {
        if (!ref) return Infinity;
        const rect = ref.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        return Math.abs(centerY - elementCenter);
      });
      const closestIndex = distances.indexOf(Math.min(...distances));
      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div style={{ marginTop: '0px' }}>
      {posts ? (
        posts.map((post, i) => (
          <div key={post.id} ref={(el) => (sectionRefs.current[i] = el)} style={{ opacity: activeIndex === i ? 1 : 0.2 }}>
            <Smartcard currentData={post}></Smartcard>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};


export default SmartCategories;
