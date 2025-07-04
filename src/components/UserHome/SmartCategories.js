import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from '../../config/firestore'
import CategoryCard from './CategoryCard';
import Smartcard from "./Smartcard";

const SmartCategories = ({ userLevel }) => {

  const [posts, setPosts] = useState();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [showDetail, setShowDetail] = React.useState(false)
  const [iscategoryexpanded, setIscategoryexpanded] = React.useState(false)
  const [categorycloseicon, setCategorycloseicon] = React.useState(false)

  let [filterdData, setFilterdData] = React.useState([])
  let [jsonItems, setJsonItems] = React.useState([])

  const content = useRef(null);
  const contentexpanded = useRef(null);

  useEffect(() => {

    async function fetchData() {
      const q = query(collection(db, "posts"), where("level", "==", userLevel.toString()));
      const querySnapshot = await getDocs(q);
      const returnedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(returnedPosts)
      // debugger;
    }
    fetchData();
  }, []);

  


  return (
    <div>
      {posts ? (
        posts.map((post, i) => (
          <div  key={post.id}>
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
