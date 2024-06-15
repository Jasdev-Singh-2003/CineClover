import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const TMDB = () => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const inpRef = useRef();

  const fetchMovies = async (query) => {
    const apiKey = "e4d2b20563484cd7482fc82634e7767d";
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    try {
      const response = await axios.get(apiUrl);
      setMovies(response.data.results);
      const detailsPromises = response.data.results.map(movie =>
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=images`)
      );
      const detailsResponses = await Promise.all(detailsPromises);
      setMovieDetails(detailsResponses.map(res => res.data));
      console.log(detailsResponses.map(res => res.data));
    } catch (error) {
      console.error("Error fetching the data.", error);
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <input type="text" ref={inpRef} />
      <button onClick={() => fetchMovies(inpRef.current.value)}>Search</button>
      <ul>
        {movieDetails.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            {movie.poster_path && (
              <div>
                <h3>Poster</h3>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
              </div>
            )}
            {movie.backdrop_path && (
              <div>
                <h3>Backdrop</h3>
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={`${movie.title} Backdrop`}
                />
              </div>
            )}
            {movie.images && movie.images.logos && movie.images.logos.length > 0 && (
              <div>
                <h3>Logo</h3>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.images.logos[0].file_path}`}
                  alt={`${movie.title} Logo`}
                />
              </div>
            )}
            {movie.images && movie.images.stills && movie.images.stills.length > 0 && (
              <div>
                <h3>Still Frame</h3>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.images.stills[0].file_path}`}
                  alt={`${movie.title} Still`}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      {movies.length > 0 && (
        <iframe
          title={`Video ${movies[0].title}`}
          src={`https://vidsrc.to/embed/movie/${movies[0].id}`}
          width="560"
          height="315"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default TMDB;
