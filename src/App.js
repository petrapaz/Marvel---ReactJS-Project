import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { getMarvelHash } from './utils/hash';
import ComicList from './components/ComicList';
import SearchBar from './components/SearchBar';
import './styles/App.css';
import ComicDetails from './components/ComicDetails';
import Pagination from './components/Pagination';
import logo from './pics/logo.png';

const App = () => {
  const [comics, setComics] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredComics, setFilteredComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComics, setTotalComics] = useState(0);
  const comicsPerPage = 40;

  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
  const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
  const ts = new Date().getTime();
  const hash = getMarvelHash(ts, privateKey, publicKey);

  const fetchComics = async (offset = 0, retries = 3) => {
    try {
      // Check if rate limit exceeded
      if (retries === 3) {
        console.error('Exceeded maximum retry attempts. Pausing requests to avoid rate limit.');
        return [];
      }
  
      const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
        params: {
          ts,
          apikey: publicKey,
          hash,
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
  };
  
  

  const fetchTotalComicsCount = async () => {
    try {
      const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
        params: {
          ts,
          apikey: publicKey,
          hash,
          limit: 1,
        },
      });
      return response.data.data.total;
    } catch (error) {
      console.error('Error fetching total comics count from Marvel API', error);
      return 0;
    }
  };

  const fetchPageComics = async (page) => {
    const offset = (page - 1) * comicsPerPage;
    const comicsBatch = await fetchComics(offset);
    setComics(comicsBatch);
    setFilteredComics(comicsBatch);
  };

  useEffect(() => {
    const initializeComics = async () => {
      const total = await fetchTotalComicsCount();
      setTotalComics(total);
      await fetchPageComics(currentPage);
    };
    initializeComics();
  }, [currentPage]);

  const fetchComicsByTitle = async (title) => {
    try {
      const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
        params: {
          ts,
          apikey: publicKey,
          hash,
          titleStartsWith: title,
          limit: comicsPerPage,
        },
      });
      console.log('Fetched comics by title:', response.data.data.results); // Debug log
      setFilteredComics(response.data.data.results);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error('Rate limit exceeded. Retrying in 1 minute...');
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute before retrying
        return fetchComicsByTitle(title); // Retry fetching comics by title
      } else {
        console.error('Error fetching data from Marvel API', error);
      }
    }
  };

  useEffect(() => {
    if (search) {
      fetchComicsByTitle(search);
    } else {
      fetchPageComics(currentPage);
    }
  }, [search, currentPage]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };

  return (
    <Router>
      <div className="App">
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
        <Routes>
          <Route path="/" element={<>
            <ComicList comics={filteredComics.slice((currentPage - 1) * comicsPerPage, currentPage * comicsPerPage)} />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalComics={Math.ceil(filteredComics.length / comicsPerPage)}
            />
          </>} />
          <Route path="/comic/:id" element={<ComicDetails comics={comics} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
