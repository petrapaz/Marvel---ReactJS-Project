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

  const fetchComics = async (offset = 0) => {
    try {
      const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
        params: {
          ts,
          apikey: publicKey,
          hash,
          limit: 100,
          offset: offset,
        },
      });
      console.log('Fetched comics batch:', response.data.data.results); // Debug log
      return response.data.data.results;
    } catch (error) {
      console.error('Error fetching data from Marvel API', error);
      return [];
    }
  };

  const fetchAllComics = async () => {
    let allComics = [];
    let offset = 0;
    let hasMoreComics = true;

    while (hasMoreComics) {
      const comicsBatch = await fetchComics(offset);
      if (comicsBatch.length > 0) {
        allComics = [...allComics, ...comicsBatch];
        offset += 100;
      } else {
        hasMoreComics = false;
      }
    }

    setComics(allComics);
    setFilteredComics(allComics);
    setTotalComics(allComics.length);
    console.log('All fetched comics:', allComics); // Debug log
  };

  useEffect(() => {
    fetchAllComics();
  }, []);

  useEffect(() => {
    filterComics(search);
  }, [search, comics]);

  const filterComics = (searchValue) => {
    const filtered = comics.filter(comic =>
      comic.title.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    setFilteredComics(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
    console.log('Filtered comics:', filtered); // Debug log
  };

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
