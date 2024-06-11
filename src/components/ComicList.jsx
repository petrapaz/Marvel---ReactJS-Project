import React from 'react';
import { Link } from 'react-router-dom';
import fallbackImage from '../pics/image-not-found.jpg'; // Import a local fallback image
import '../styles/ComicList.css';

const ComicList = ({ comics }) => {
  if (comics.length === 0) {
    return <div>No comics found.</div>;
  }

  return (
    <div className="comics-list">
      {comics.map(comic => {
        // Get the thumbnail URL
        const thumbnailUrl = `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`;

        // Check if the thumbnail is available
        const isThumbnailAvailable = comic.thumbnail.path.indexOf('image_not_available') === -1;

        return (
          <Link to={`/comic/${comic.id}`} key={comic.id}>
            <div className="comic">
              <img src={isThumbnailAvailable ? thumbnailUrl : fallbackImage} alt={comic.title} />
              <h2>{comic.title}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ComicList;
