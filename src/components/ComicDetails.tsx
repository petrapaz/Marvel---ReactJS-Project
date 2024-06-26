import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Comic } from '../types/comic';
import logo from '../pics/logo.png';

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
  const navigate = useNavigate();

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

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  if (!comic) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Comic not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Marvel Comics" className="h-8 mr-2" />
            <span className="text-xl font-bold">Marvel Comics</span>
          </Link>
          <button
            onClick={handleBackClick}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-4">
            <img
              src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
              alt={comic.title}
              className="rounded-lg shadow-lg mb-4"
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '900px' }}
            />
          </div>
          <div className="md:w-1/2 pl-4">
            <div className="text-left md:text-left">
              <h2 className="text-3xl font-bold mb-2">{comic.title}</h2>
              <p className="mb-2">{comic.description || 'Description not available.'}</p>
              <p className="mb-2"><strong>Page Count:</strong> {comic.pageCount}</p>
              <p className="mb-2"><strong>Series:</strong> {comic.series.name}</p>
              <p className="mb-2"><strong>Prices:</strong></p>
              <ul className="list-disc list-inside mb-2">
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
      </div>
    </div>
  );
};

export default ComicDetails;
