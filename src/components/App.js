import React from "react";
import "../css/App.css";
import "materialize-css/dist/css/materialize.min.css";
import { Row, Col } from "react-materialize";
import Movie from "./Movie";

class App extends React.Component {
  state = { movies: [] };

  componentDidMount() {
    const movies = fetch("http://localhost:5000/api/movies", {
      mode: "no-cors"
    })
      .then(res => {
        if (res.ok) return res;
        throw Error("404 Not Found");
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));

    this.setState({ movies: movies });
  }

  render() {
    return (
      <Row>
        <Col s={12} className="wrapper">
          <div className="content blue-grey lighten-1 white-text">
            <div className="app-title">Cinema App</div>
            <div className="program`">Program:</div>
            <Col s={6} className="movies-wrapper">
              <Movie></Movie>
            </Col>
            <Col s={6} className="movies-wrapper">
              <Movie></Movie>
            </Col>
          </div>
          <footer className="footer">
            <p>&copy; Copyright Paulina R., Aldona T., Marek Sz. 2020</p>
          </footer>
        </Col>
      </Row>
    );
  }
}

export default App;
