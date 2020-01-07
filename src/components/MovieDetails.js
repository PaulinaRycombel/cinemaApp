import React from "react";
import "../css/App.css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-materialize";
import MovieList from "./MovieList";
import Button from "react-materialize/lib/Button";

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  callMoviesAPI = async movieId => {
    await fetch(`http://localhost:5000/movies/${movieId}`)
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(data => {
        console.log("data: ", data);
        this.setState({ movie: data });
      });
  };

  componentDidMount() {
    this.callMoviesAPI(this.props.match.params.movieId);
  }
  genreateLink(hour, day) {
    return `/screenings/${this.state.movie._id}-${hour.replace(
      ":",
      ""
    )}-${day}`;
  }

  render() {
    return (
      <div className="content">
        {Object.entries(this.state.movie).length === 0 ? (
          "loading..."
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div style={{ margin: "2vw" }}>
              <img
                src={this.state.movie.img_url}
                style={{ maxHeight: "80vh" }}
              />
            </div>
            <div style={{ margin: "2vw" }}>
              <h2>{this.state.movie.title}</h2>
              <p>
                <b>Actors: </b>
                {this.state.movie.actors}
              </p>
              <p>
                <b>Runtime: </b>
                {this.state.movie.runtime}
              </p>
              <p>
                <b>Genres: </b>
                {this.state.movie.genres}
              </p>
              <br />
              <p>{this.state.movie.description}</p>
              <br />
              <p>
                <b>Showtime today:</b>
              </p>
              <p>
                {this.state.movie.showtime_today.split(", ").map(hour => (
                  <Link
                    style={{
                      display: "inline-block",
                      color: "white",
                      backgroundColor: "#0D47A1",
                      padding: 5,
                      margin: 10,
                      marginLeft: 0
                    }}
                    to={this.genreateLink(hour, "today")}
                  >
                    {hour}
                  </Link>
                ))}
              </p>
              <p>
                <b>Showtime tomorrow:</b>
              </p>
              <p>
                {this.state.movie.showtime_tomorrow.split(", ").map(hour => (
                  <Link
                    style={{
                      display: "inline-block",
                      color: "white",
                      backgroundColor: "#0D47A1",
                      padding: 5,
                      margin: 10,
                      marginLeft: 0
                    }}
                    to={this.genreateLink(hour, "tomorrow")}
                  >
                    {hour}
                  </Link>
                ))}
              </p>
              <p>
                <Link
                  style={{ color: "white ", textTransform: "uppercase" }}
                  to="/"
                >
                  Back
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MovieDetails;
