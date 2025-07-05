import React, { useState, useEffect, useRef } from "react";
import './categoryCard.css';
import { jsonItems } from "./jsonItems";
import { Storage } from '@capacitor/storage';
import globeVar from "./globals";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firestore'

let currentData = {}
let current = 1;

const CategoryCard = (props) => {

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
  const onClick = (key) => {
    setShowDetail(true);
    current = key;
    currentData = filterdData.filter(item => (item.id == key))[0];
  }

  const expandCategory = () => {
    setIscategoryexpanded(true);
    // setCategorycloseicon(true);
  }


  useEffect(() => {

    if (content.current) {
      content.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Example: focus on an input
    }
    if (contentexpanded.current) {
      contentexpanded.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Example: focus on an input
    }

    async function fetchData() {
      // You can await here
      const querySnapshot = await getDocs(collection(db, "posts"));
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      // setPosts(posts)
      const tempArray = [];
      // debugger;
      for (const [key, value] of Object.entries(posts)) {
        const tempObject = value;
        tempObject['id'] = key
        tempArray.push(tempObject);
      }
      setFilterdData(tempArray);
    }
    fetchData();
  }, [content, showDetail, iscategoryexpanded, contentexpanded]);




  filterdData = filterdData.filter(item => (item.category == props.category));
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

  const onExpandCategoryClose = () => {
    setIscategoryexpanded(false);
    // setShowcategoryclose(false);
  }


  return (
    <>
      {showDetail ? <div ref={content}>
        <div className="details" id="detailsDiv"  >
          <div className="detail-title">
            <div className="headerTitle" >
              {<div>{currentData.title}</div>}

              <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                <div onClick={() => onFavourite(currentData)}>
                  &#x2661;
                </div>
                <div onClick={() => onClose()}>
                  &#x2715;
                </div>
              </div>
            </div>



          </div>
          <div className='detail-description'>
            {/* {currentData.description}  */}
            {/* {currentData.details} */}
          </div>
          <div className='description-body'>
            {
              currentData.contentType == 'audio' ? <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${currentData.code}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}></iframe>
                :
                currentData.contentType == 'video' ?
                  <iframe
                    className='iframe-video'
                    src={`https://www.youtube.com/embed/${currentData.code}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  /> : null
            }
          </div>

        </div>
      </div> : null}
      <div ref={contentexpanded} className={iscategoryexpanded ? 'category-box-expanded' : 'category-box'} >
        <div className="category-title-container">
          <div className="category-title" onClick={() => expandCategory()}>{props.category}
          </div>
          {iscategoryexpanded ?
            <div onClick={() => onExpandCategoryClose()}>
              &#x2715;
            </div>
            : null}

        </div>
        <div className="category-container">
          {filterdData.map((data, key) => {
            return (
              <div className={props.type == "2" ? 'category-item-none' : 'category-item'}
                onClick={() => onClick(data.id)} key={key}>
                <div className="card-layout" onClick={() => onExpandCategoryClose()} >
                  <img style={{ 'width': '64px', 'height': '64px' }} src={'https://img.youtube.com/vi/' + data.code + '/hqdefault.jpg'}></img>
                  <div>
                    <div className="category-item-title">{data.title}</div>
                    <div className="category-item-description">{data.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </>
  );
};

export default CategoryCard