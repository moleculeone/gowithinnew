import React, { useState, useEffect, useRef } from "react";
import './categoryCard.css';
import { jsonItems } from "./jsonItems";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import CloseIcon from '@mui/icons-material/Close';
import { Storage } from '@capacitor/storage';
import globeVar from "./globals";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firestore'
import DOMPurify from 'dompurify';

let currentData = {}
let current = 1;

const Smartcard = (currentData) => {

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
    // console.log(currentData.currentData)
  }, []);

  const onFavourite = async (selected) => {
    let oldFavs = await getFavourites();
    let oldFavsArray = oldFavs?.split(',');
    const newFavsSet = new Set();
    for (let i = 0; i < oldFavsArray?.length; i++) {
      newFavsSet.add(parseInt(oldFavsArray[i]));
    }
    newFavsSet.add(selected.id);
    setFavourite(Array.from(newFavsSet));
    alert('Added to favourites!');
  }

  const onClose = () => {
    setShowDetail(false);
  }

  const setFavourite = async (selected) => {
    await Storage.set({
      key: 'favId',
      value: '1',
    });
  };

  const getFavourites = async () => {
    const { value } = await Storage.get({ key: 'favId' });
    return value;
  };

  return (
    <>
      <div className='category-box-smart' >
        <div className="category-container-smart">
          <div className="category-title-smart" >{currentData.currentData.category} - {currentData.currentData.title}</div>
          <div className='description-body-smart'>
            {(() => {
              switch (currentData.currentData.contentType) {
                case 'audio':
                  return <iframe width="100%" height="166" scrolling="no" frameborder="no" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${currentData.code}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}></iframe>
                case 'video':
                  return <iframe
                    className='iframe-video-smart'
                    src={`https://www.youtube.com/embed/${currentData.currentData.code}?rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen width="100%" height="100%" frameBorder="0" 
                  />
                case 'text':
                  return  <div dangerouslySetInnerHTML={{ __html:  DOMPurify.sanitize(currentData.currentData.code) }} />

                default:
                  return null
              }
            })()}

          </div>
        </div>

      </div>
    </>
  );
};

export default Smartcard