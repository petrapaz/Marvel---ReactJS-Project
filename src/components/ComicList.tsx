// src/components/ComicList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Comic } from '../types/comic'; // Import the Comic interface
import fallbackImage from '../pics/image-not-found.jpg'; // Import a local fallback image

interface Props {
  comics: Comic[];
}

const ComicList: React.FC<Props> = ({ comics }) => {
  if (comics.length === 0) {
    return <div className="text-white">No comics found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {comics.map((comic) => {
        // Get the thumbnail URL
        const thumbnailUrl = `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`;

        // Check if the thumbnail is available
        const isThumbnailAvailable =
          comic.thumbnail.path.indexOf('image_not_available') === -1;

        return (
          <Link
            to={`/comic/${comic.id}`}
            key={comic.id}
            className="flex items-stretch justify-center"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex-1">
              <img
                src={isThumbnailAvailable ? thumbnailUrl : fallbackImage}
                alt={comic.title}
                className="w-full h-72 sm:h-96 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{comic.title}</h2>
                {/* Additional comic information if needed */}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ComicList;
