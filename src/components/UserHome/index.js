import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../App/App.css'
import Header from './Header';
import Section from './Section';
import CategoryCard from './CategoryCard';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firestore'
import UploadPosts from './UploadPosts';
import Quotes from './Quotes';
import LevelSelection from './LevelSelection';
import DumbCategories from './DumbCategories';
import SmartCategories from './SmartCategories';

const UserHome = ({ setIsAuthenticated }) => {
  const [posts, setPosts] = useState();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [level, setLevel] = useState(0);


  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setPosts(posts)
  }

  useEffect(() => {
  }, [level]);

  const handleEdit = id => {
    const [post] = posts.filter(post => post.id === id);
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleLevelSelection = (data) => {
    setLevel(Number(data));
  };

  return (
    <div className={'container '}>


      <Header
        setIsAdding={setIsAdding}
        setIsAuthenticated={setIsAuthenticated}
      />
      {/* <Section posts={posts} /> */}
      {/* <UploadPosts></UploadPosts> */}
      {
        level > 0 && level <= 3
          ?
          // <SmartCategories userLevel={level} ></SmartCategories>
           <DumbCategories />
          :
          level == 4
            ?
            <DumbCategories />
            :
            <LevelSelection onDataSend={handleLevelSelection}></LevelSelection>
      }
    </div>
  );
};

export default UserHome;
