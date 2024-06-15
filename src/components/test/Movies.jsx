import React, { useEffect } from "react";
import { MANGA } from "@consumet/extensions";

const Movies = () => {
  const fetchMovie = async () => {
    const movies = new MANGA.MangaDex();
    try {
      const data = await movies.search("One Piece");
      console.log(data);
    } catch (error) {
      console.error("Error fetching the data.", error);
    }
  };

  useEffect(() => {
  
    fetchMovie();

  }, []);

  return <div>Movies</div>;
};

export default Movies;
