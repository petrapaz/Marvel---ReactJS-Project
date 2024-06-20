// src/components/ComicDetails.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Comic } from '../types/comic';
import logo from '../pics/logo.png'; // Adjust the path to your logo image

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY as string;

const fetchComicDetails = async (id: string): Promise<Comic> => {
  const response = await axios.get(`https://gateway.marvel.com/v1/public/comics/${id}`, {
    params: {
      apikey: publicKey,
    },
  });
  return response.data.data.results[0];
};

const ComicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [comic, setComic] = useState<Comic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComicDetails = async () => {
      try {
        const comicDetails = await fetchComicDetails(id!);
        setComic(comicDetails);
      } catch (error) {
        console.error('Error fetching comic details', error);
      } finally {
        setLoading(false);
      }
    };

    getComicDetails();
  }, [id]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (!comic) return <div className="text-white">Comic not found</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex flex-col items-center">
      <header className="w-full flex justify-start mb-6">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Marvel Comics" className="h-12" />
        </Link>
      </header>
      <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg p-4 md:p-8">
        <img
          className="md:w-1/3 rounded-lg"
          src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
          alt={comic.title}
        />
        <div className="mt-4 md:mt-0 md:ml-8 flex flex-col">
          <h2 className="text-3xl font-bold mb-4">{comic.title}</h2>
          <p className="mb-4">{comic.description || 'No description available.'}</p>
          <p className="mb-2"><strong>Page Count:</strong> {comic.pageCount}</p>
          <p className="mb-2"><strong>Series:</strong> {comic.series.name}</p>
          <p className="mb-2"><strong>Prices:</strong></p>
          <ul className="list-disc list-inside mb-4">
            {comic.prices.map((price, index) => (
              <li key={index}>{price.type}: ${price.price}</li>
            ))}
          </ul>
          <p className="mb-2"><strong>Creators:</strong></p>
          <ul className="list-disc list-inside">
            {comic.creators.items.map((creator, index) => (
              <li key={index}>{creator.role}: {creator.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComicDetails;
