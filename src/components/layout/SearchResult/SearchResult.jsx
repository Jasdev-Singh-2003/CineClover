import { ANIME } from '@consumet/extensions';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SearchResult = () => {
  let { animeName } = useParams();
  const [animeData, setAnimeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchSearchData = async (query, page = 1) => {
    const gogoanime = new ANIME.Gogoanime();
    try {
      const data = await gogoanime.search(query, page);
      console.log("Data", data);
      setAnimeData((prevData) => [...prevData, ...data.results]);
      setCurrentPage(data.currentPage);
      setHasNextPage(data.hasNextPage);
    } catch (error) {
      console.error("Error fetching the data.", error);
    }
  };

  useEffect(() => {
    if (animeName) {
      setAnimeData([]); // Reset the data when a new search is performed
      fetchSearchData(animeName);
    }
  }, [animeName]);

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchSearchData(animeName, currentPage + 1);
    }
  };

  return (
    <div className="w-full px-12 mt-10">
      <h1 className="text-2xl font-semibold mb-6">Search Results for: {animeName}</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {animeData.map((anime) => (
          <Link to={`/anime/${anime.id}`} key={anime.id} className="p-3 border box-border rounded-lg shadow-md flex flex-col items-center gap-2">
            <img
              src={anime.image}
              alt={anime.title}
              className="h-48 w-full object-contain rounded"
            />
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold text-primary1 text-center">{anime.title}</h2>
              <Link
                to={anime.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-secondary1 mt-2"
              >
                More Info
              </Link>
            </div>
          </Link>
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button onClick={handleLoadMore} className="px-6 py-2 bg-primary1 text-white rounded-lg shadow-md hover:bg-primary2">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
