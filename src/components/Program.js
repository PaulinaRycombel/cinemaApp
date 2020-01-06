import React from "react";
import "../css/App.css";
import "materialize-css/dist/css/materialize.min.css";
import { Row, Col } from "react-materialize";
import MovieList from "./MovieList";
import Button from "react-materialize/lib/Button";

class Program extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviesNumber: 4
    };
  }

  callMoviesAPI = async () => {
    await fetch("http://localhost:5000/movies")
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(data => {
        console.log("data: ", data);
        this.setState({ movies: data });
      });
  };

  componentDidMount() {
    this.callMoviesAPI();
  }

  handleButtonClick = () => {
    let renderedMovies = this.state.moviesNumber;
    if (renderedMovies < this.state.movies.length) {
      renderedMovies += 2;
    }
    this.setState({ moviesNumber: renderedMovies });
  };

  render() {
    return (
      <div className="content">
        <div className="program">Program:</div>
        {this.state.movies.length === 0 ? (
          "Loading..."
        ) : (
          <MovieList
            movies={this.state.movies}
            moviesNumber={this.state.moviesNumber}
          />
        )}
        {this.state.moviesNumber === this.state.movies.length ? (
          ""
        ) : (
          <Button
            className="blue darken-4 ripple"
            node="button"
            small
            style={{
              marginRight: "5px"
            }}
            waves="red"
            onClick={this.handleButtonClick}
          >
            Show more
          </Button>
        )}
      </div>
    );
  }
}

export default Program;
