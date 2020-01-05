import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "../css/Movie.css";

const Movie = ({ movie }) => {
  return (
    <a href="#" className="home-page collection-item blue-grey lighten-1">
      <img src={movie.img_url} alt={movie.title} />
      <span className="title white-text">{movie.title}</span>
    </a>
  );
};

export default Movie;
