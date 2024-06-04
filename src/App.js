// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { getMarvelHash } from './utils/hash';
import ComicList from './components/ComicList';
import SearchBar from './components/SearchBar';
import './styles/App.css';
import ComicDetails from './components/ComicDetails';
import Pagination from './components/Pagination';
import logo from './logo.png'; // Import the logo image

const App = () => {
  const [comics, setComics] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredComics, setFilteredComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComics, setTotalComics] = useState(0);

  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
  const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
  const ts = new Date().getTime();
  const hash = getMarvelHash(ts, privateKey, publicKey);

  const fetchComics = (page = 1) => {
    const offset = (page - 1) * 20;
    axios
      .get('https://gateway.marvel.com/v1/public/comics', {
        params: {
          ts,
          apikey: publicKey,
          hash,
          limit: 20,
          offset: offset,
        },
      })
      .then(response => {
        setComics(response.data.data.results);
        setFilteredComics(response.data.data.results);
        setTotalComics(response.data.data.total);
      })
      .catch(error => {
        console.error('Error fetching data from Marvel API', error);
      });
  };

  useEffect(() => {
    fetchComics(currentPage);
  }, [currentPage]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue === '') {
      setFilteredComics(comics);
    } else {
      const filtered = comics.filter(comic =>
        comic.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredComics(filtered);
    }
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
            <ComicList comics={filteredComics} />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalComics={totalComics}
            />
          </>} />
          <Route path="/comic/:id" element={<ComicDetails comics={comics} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

