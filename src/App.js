import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ComicList from './components/ComicList';
import SearchBar from './components/SearchBar';
import './styles/App.css';
import ComicDetails from './components/ComicDetails';
import Pagination from './components/Pagination';
import logo from './pics/logo.png';

const AppContent = () => {
  const [filteredComics, setFilteredComics] = useState([]);
  const [totalComics, setTotalComics] = useState(0);
  const [totalFilteredComics, setTotalFilteredComics] = useState(0);
  const comicsPerPage = 40;

  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const search = query.get('search') || '';
  const currentPage = parseInt(query.get('page'), 10) || 1;

  const fetchComics = useCallback(async (offset = 0, retries = 3) => {
    try {
      if (retries === 0) {
        console.error('Exceeded maximum retry attempts. No more retries.');
        return [];
      }

      const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
        params: {
          apikey: publicKey,
          limit: comicsPerPage,
          offset: offset,
        },
      });

      console.log('Fetched comics batch:', response.data.data.results); // Debug log
      return response.data.data.results;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error('Rate limit exceeded. Pausing requests to avoid rate limit.');
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute
        return fetchComics(offset, retries - 1); // Retry fetching comics with one less retry
      } else {
        console.error('Error fetching data from Marvel API', error);
        return [];
      }
    }
  }, [publicKey, comicsPerPage]);

  const fetchTotalComicsCount = useCallback(async () => {
    try {
      const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
        params: {
          apikey: publicKey,
          limit: 1,
        },
      });
      console.log('Total comics count:', response.data.data.total); // Debug log
      return response.data.data.total;
    } catch (error) {
      console.error('Error fetching total comics count from Marvel API', error);
      return 0;
    }
  }, [publicKey]);

  const fetchPageComics = useCallback(async (page) => {
    const offset = (page - 1) * comicsPerPage;
    const comicsBatch = await fetchComics(offset);
    setFilteredComics(comicsBatch);
  }, [fetchComics, comicsPerPage]);

  const fetchComicsByTitle = useCallback(async (title, page) => {
    const offset = (page - 1) * comicsPerPage;
    try {
      const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
        params: {
          apikey: publicKey,
          titleStartsWith: title,
          limit: comicsPerPage,
          offset: offset,
        },
      });

      console.log('Fetched comics by title:', response.data.data.results); // Debug log
      setFilteredComics(response.data.data.results);
      setTotalFilteredComics(response.data.data.total); // Update totalFilteredComics state with the total count of comics matching the search query
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error('Rate limit exceeded. Retrying in 1 minute...');
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute before retrying
        return fetchComicsByTitle(title, page); // Retry fetching comics by title
      } else {
        console.error('Error fetching data from Marvel API', error);
      }
    }
  }, [publicKey, comicsPerPage]);

  useEffect(() => {
    const initializeComics = async () => {
      const total = await fetchTotalComicsCount();
      setTotalComics(total);
      if (search) {
        await fetchComicsByTitle(search, currentPage);
      } else {
        await fetchPageComics(currentPage);
      }
    };
    initializeComics();
  }, [currentPage, search, fetchTotalComicsCount, fetchPageComics, fetchComicsByTitle]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    navigate(`/?search=${searchValue}&page=1`);
  };

  const setCurrentPage = (page) => {
    navigate(`/?search=${search}&page=${page}`);
  };

  const totalPages = search
    ? Math.ceil(totalFilteredComics / comicsPerPage)
    : Math.ceil(totalComics / comicsPerPage);

  console.log('totalPages:', totalPages);
  console.log('totalFilteredComics:', totalFilteredComics);
  console.log('totalComics:', totalComics);

  return (
    <div>
      <header className="fixed-header">
        <div className="header-content">
          <div className="logo-search-container">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Marvel Comics" className="logo" />
            </Link>
            <SearchBar search={search} handleSearchChange={handleSearchChange} />
          </div>
        </div>
      </header>
      <ComicList comics={filteredComics} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages || 0}
      />
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/comic/:id" element={<ComicDetails />} />
    </Routes>
  </Router>
);

export default App;




