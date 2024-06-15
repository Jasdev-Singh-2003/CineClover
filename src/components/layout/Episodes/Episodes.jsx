import { Button } from "@/components/ui/button";
import { ANIME } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Episodes = () => {
  let { animeId } = useParams();
  const [animeInfo, setAnimeInfo] = useState([]);

  const fetchInfo = async (query) => {
    const gogoanime = new ANIME.Gogoanime();
    try {
      const info = await gogoanime.fetchAnimeInfo(query);
      console.log(info);
      setAnimeInfo(info.episodes);
    } catch (error) {
      console.error("Error fetching the information.", error);
    }
  };

  useEffect(() => {
    fetchInfo(animeId);
  }, [animeId]);

  return (
    <div>
      <h1>Anime Episodes for ID: {animeId}</h1>
      <ul className="flex w-full flex-wrap">
        {animeInfo.map((episode, index) => (
          <li key={index} className="m-2">
            {/* Assuming you want to navigate to a route like `/anime/:animeId/:episodeId` */}
            <Link to={`/anime/${animeId}/${episode.id}`}>
            <Button className="text-secondary1">
              {index + 1}
            </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Episodes;
