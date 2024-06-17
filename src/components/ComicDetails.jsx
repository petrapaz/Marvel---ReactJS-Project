import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ComicDetails.css';

const ComicDetails = () => {
  const { id } = useParams(); // Use useParams hook to get the comic ID from URL
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;

        console.log('Fetching comic details for ID:', id); // Add this line

        const response = await axios.get(`https://gateway.marvel.com/v1/public/comics/${id}`, {
          params: {
            apikey: publicKey,
          },
        });

        console.log('Comic details response:', response.data); // Add this line

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
      <img src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`} alt={comic.title} />
      <div className='detail-text'>
        <h2>{comic.title}</h2>
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
    </div>
  );
};

export default ComicDetails;
