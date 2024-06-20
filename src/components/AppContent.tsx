// src/components/AppContent.tsx
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ComicList from './ComicList';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import logo from '../pics/logo.png';
import { Comic } from '../types/comic';
import '../styles/index.css';

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY as string;

const fetchComics = async (offset: number, search: string) => {
  const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
    params: {
      apikey: publicKey,
      limit: 40,
      offset: offset,
      titleStartsWith: search || undefined,
    },
  });
  return response.data.data;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const search = query.get('search') || '';
  const currentPage = parseInt(query.get('page') || '1', 10);

  const offset = (currentPage - 1) * 40;

  const { data, error, isLoading } = useQuery({
    queryKey: ['comics', offset, search],
    queryFn: () => fetchComics(offset, search),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    navigate(`/?search=${searchValue}&page=1`);
  };

  const setCurrentPage = (page: number) => {
    navigate(`/?search=${search}&page=${page}`);
  };

  const comics: Comic[] = data?.results || [];
  const totalComics = data?.total || 0;
  const totalPages = Math.ceil(totalComics / 40);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="fixed top-0 w-full bg-gray-800 p-4 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <img src={logo} alt="Marvel Comics" className="h-10" />
            </Link>
            <SearchBar search={search} handleSearchChange={handleSearchChange} />
          </div>
        </div>
      </header>
      <main className="pt-20 pb-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-white">Loading...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-red-500">Error loading comics</div>
          </div>
        ) : (
          <ComicList comics={comics} />
        )}
      </main>
      <footer className="w-full bg-gray-800 p-4 fixed bottom-0">
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            className="mt-4"
          />
        </div>
      </footer>
    </div>
  );
};

export default AppContent;


