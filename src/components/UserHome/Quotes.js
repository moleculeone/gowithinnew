import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firestore'

const Quotes = ({ }) => {
    const [quotes, setQuotes] = useState();
    const getQuotes = async () => {
      const querySnapshot = await getDocs(collection(db, "quote"));
      const quotes = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setQuotes(quotes)
    }
  
    useEffect(() => {
      getQuotes()
    }, []);


  return (
    <div class="category-box-none" style={{'padding': '8px'}}>
      {quotes ? (
        quotes.map((quote, i) => (
          <div key={quote.id}>
            {quote.quote}
            {quote.author}
          </div>
        ))
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};


export default Quotes;
