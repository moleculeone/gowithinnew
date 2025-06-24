import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firestore'


const Add = ({ posts, setPosts, setIsAdding, getPosts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [code, setCode] = useState('');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('');
  const [icon, setIcon] = useState('');
  const [type, setType] = useState('');
  const [sticky, setSticky] = useState('');
  const [category, setCategory] = useState('');
  const [quote, setQuote] = useState('');
  const [contentType, setContentType] = useState('');
  const [courseCode, setcourseCode] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!title || !description ) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newPost = {
      title,
      description,
      details,
      code,
      instructor,
      duration,
      icon,
      type,
      sticky,
      category,
      quote,
      contentType,
      courseCode
    };



    posts.push(newPost);

    try {
      await addDoc(collection(db, "posts"), {
        ...newPost
      });
    } catch (error) {
      console.log(error)
    }

    setPosts(posts);
    setIsAdding(false);
    getPosts();
   

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${title}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Post</h1>
        <label htmlFor="firstName">title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
       
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
