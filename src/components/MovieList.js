import React from "react";
import Movie from "./Movie";

const MovieList = ({ movies, moviesNumber }) => {
  const recievedList = movies.map((movie, i) => {
    return <Movie key={`movie-${i + 1}`} movie={movie} />;
  });

  const renderedList = recievedList.map((movie, i) => {
    if (i < moviesNumber) return movie;
  });

  return <div className="collection">{renderedList}</div>;
};

export default MovieList;
