import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "../css/Movie.css";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="home-page collection-item blue-grey lighten-1"
    >
      <img src={movie.img_url} alt={movie.title} />
      <span className="title white-text">{movie.title}</span>
    </Link>
  );
};

export default Movie;
