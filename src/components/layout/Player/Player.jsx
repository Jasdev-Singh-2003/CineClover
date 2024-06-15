import { Button } from "@/components/ui/button";
import { ANIME } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Player = () => {
  let { episodeId } = useParams();
  const [animeStreams, setAnimeStreams] = useState([]);
  const [currentServer, setCurrentServer] = useState("");

  const fetchServers = async (query) => {
    const gogoanime = new ANIME.Gogoanime();
    try {
      const streams = await gogoanime.fetchEpisodeServers(query);
      console.log(streams);
      setAnimeStreams(streams);
      // Set the current server to the first stream initially
      if (streams.length > 0) {
        setCurrentServer(streams[0].url);
      }
    } catch (error) {
      console.error("Error fetching the information.", error);
    }
  };

  useEffect(() => {
    fetchServers(episodeId);
  }, [episodeId]);

  const handleServerClick = (url) => {
    setCurrentServer(url);
  };

  return (
    <>
      <h1>Anime Servers</h1>
      <div className="w-full flex flex-col justify-center items-center">
        <h2>{episodeId}</h2>
      {currentServer && (
        <iframe
          title={`Video Player`}
          src={currentServer}
          width="560"
          height="315"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      <ul className="flex">
        {animeStreams.slice(0, 5).map((stream, index) => (
          <div key={index} className="m-2">
            <Button
              className="text-secondary1"
              onClick={() => handleServerClick(stream.url)}
            >
              {stream.name}
            </Button>
          </div>
        ))}
      </ul>
      </div>
    </>
  );
};

export default Player;
