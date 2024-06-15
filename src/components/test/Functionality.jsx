import React, { useState, useEffect, useRef } from "react";
import { ANIME } from "@consumet/extensions";

const Functionality = () => {
  const [animeData, setAnimeData] = useState([]);
  const [animeInfo, setAnimeInfo] = useState([]);
  const [animeStreams, setAnimeStreams] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    fetchAll(inputRef.current.value);
  }, []);

  const fetchData = async (query) => {
    const gogoanime = new ANIME.Gogoanime();
    try {
      const data = await gogoanime.search(query);
      console.log("Data", data);
      setAnimeData(data.results.map((anime) => anime.title));
    } catch (error) {
      console.error("Error fetching the data.", error);
    }
  };

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

  const fetchServers = async () => {
    const gogoanime = new ANIME.Gogoanime();
    try {
      const streams = await gogoanime.fetchEpisodeServers(
        "one-piece-episode-1106"
      );
      console.log(streams);
      setAnimeStreams(streams);
    } catch (error) {
      console.error("Error fetching the information.", error);
    }
  };

  const fetchTop = async () => {
    const gogoanime = new ANIME.Gogoanime();
    try {
      const topAir = await gogoanime.fetchTopAiring();
      console.log(topAir);
    } catch (error) {
      console.error("Error fetching the information.", error);
    }
  };

  const fetchAll = (query) => {
    fetchData(query);
    fetchInfo(query);
    fetchServers();
    fetchTop();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={() => fetchAll(inputRef.current.value)}>Search</button>
      <h1>Anime List</h1>
      <ul>
        {animeData.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
      <h1>Anime Info</h1>
      <ul>
        {animeInfo.slice(0, 20).map((episode, index) => (
          <li key={index}>
            {episode.id} - <a href={episode.url}>{episode.url}</a>
          </li>
        ))}
      </ul>
      <h1>Anime Servers</h1>
      <ul>
        {animeStreams.slice(0, 3).map((stream, index) => (
          <li key={index}>
            {stream.name} - <a href={stream.url}>{stream.url}</a>
            <br />
            <iframe
              title={`Video ${index}`}
              src={stream.url}
              width="560"
              height="315"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Functionality;
