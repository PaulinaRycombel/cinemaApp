import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../css/App.css";
import "materialize-css/dist/css/materialize.min.css";
import { Row, Col } from "react-materialize";
import Program from "./Program";
import Screening from "./Screening";
import Reservation from "./Reservation";
import MovieDetails from "./MovieDetails";

class App extends React.Component {
  render() {
    return (
      <Row>
        <Col s={12} className="wrapper">
          <div
            className="content blue-grey lighten-1 white-text"
            style={{ paddingBottom: "1.5rem" }}
          >
            <div className="app-title">Cinema App</div>
            <Router>
              <Route path="/movies/:movieId" component={MovieDetails} />
              <Route path="/screenings/:screeningId" component={Screening} />
              <Route
                path="/reservations/:reservationId"
                component={Reservation}
              />

              <Route exact path="/" component={Program} />
            </Router>
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

/*
 */
