
// src/components/ComicDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getMarvelHash } from '../utils/hash'; // Ensure the path is correct
import '../styles/ComicDetails.css';

const ComicDetails = () => {
  const { id } = useParams(); // Use useParams hook to get the comic ID from URL
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
        const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
        const ts = new Date().getTime();
        const hash = getMarvelHash(ts, privateKey, publicKey);

        const response = await axios.get(`https://gateway.marvel.com/v1/public/comics/${id}`, {
          params: {
            ts,
            apikey: publicKey,
            hash,
          },
        });

        setComic(response.data.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comic details', error);
        setLoading(false);
      }
    };

    fetchComicDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!comic) {
    return <div>Comic not found</div>;
  }

  return (
    <div className="comic-details">
      <h2>{comic.title}</h2>
      <img src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`} alt={comic.title} />
      <p>{comic.description}</p>
      <p><strong>Page Count:</strong> {comic.pageCount}</p>
      <p><strong>Series:</strong> {comic.series.name}</p>
      <p><strong>Prices:</strong></p>
      <ul>
        {comic.prices.map((price, index) => (
          <li key={index}>{price.type}: ${price.price}</li>
        ))}
      </ul>
      <p><strong>Creators:</strong></p>
      <ul>
        {comic.creators.items.map((creator, index) => (
          <li key={index}>{creator.role}: {creator.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComicDetails;