import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firestore'

const Dashboard = ({ setIsAuthenticated }) => {
  const [posts, setPosts] = useState();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setPosts(posts)
  }

  useEffect(() => {
    getPosts()
  }, []);

  const handleEdit = id => {
    const [post] = posts.filter(post => post.id === id);

    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [post] = posts.filter(post => post.id === id);

        deleteDoc(doc(db, "post", id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${post.title} 's data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        const postsCopy = posts.filter(post => post.id !== id);
        setPosts(postsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            posts={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          posts={posts}
          setPosts={setPosts}
          setIsAdding={setIsAdding}
          getPosts={getPosts}
        />
      )}
      {isEditing && (
        <Edit
          posts={posts}
          selectedPost={selectedPost}
          setPosts={setPosts}
          setIsEditing={setIsEditing}
          getPosts={getPosts}
        />
      )}
    </div>
  );
};

export default Dashboard;
