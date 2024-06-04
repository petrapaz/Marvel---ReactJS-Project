// src/components/ComicList.js
import React from 'react';
import { Link } from 'react-router-dom';

const ComicList = ({ comics }) => {
  if (comics.length === 0) {
    return <div>No comics found.</div>;
  }

  return (
    <div className="comics-list">
      {comics.map(comic => (
        <Link to={`/comic/${comic.id}`} key={comic.id}>
          <div className="comic">
            <img src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`} alt={comic.title} />
            <h2>{comic.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ComicList;


