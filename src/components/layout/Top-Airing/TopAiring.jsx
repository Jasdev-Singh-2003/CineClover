import React, { useEffect, useState } from "react";
import { ANIME } from "@consumet/extensions";
import { Link } from "react-router-dom";

const TopAiring = () => {
  const [topAir, setTopAir] = useState([]);

  const fetchTopAiring = async () => {
    const gogoanime = new ANIME.Gogoanime();
    try {
      const data = await gogoanime.fetchTopAiring();
      console.log(data);
      setTopAir(data.results);
    } catch (error) {
      console.error("ERROR", error);
    }
  };
  useEffect(() => {
    fetchTopAiring();
  }, []);
  return (
    <>
      <div className="w-full px-12 mt-10">
        <div className="w-full grid grid-cols-5 gap-4">
          {topAir.map((anime) => (
            <Link to={`/anime/${anime.id}`} key={anime.id} className="p-3 border box-border rounded-lg shadow-md flex gap-2">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="h-48 object-contain rounded"
                />
              <div className="flex flex-col">
                <h2 className="line-clamp-5 text-lg font-semibold text-primary1">{anime.title}</h2>
                <p
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-secondary1"
                >
                  More Info
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopAiring;
