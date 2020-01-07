import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: {}
    };
  }
  callMoviesAPI = async reservationId => {
    await fetch(`http://localhost:5000/reservations/${reservationId}`)
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(data => {
        console.log("data: ", data);
        this.setState({ reservation: data });
      });
  };

  componentDidMount() {
    this.callMoviesAPI(this.props.match.params.reservationId);
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {Object.entries(this.state.reservation).length === 0 ? (
          <p>Your reservation was succesfull. Loading details ...</p>
        ) : (
          <div>
            <h5>Details of your reservation</h5>
            <p>
              <b>Reservation id: {this.state.reservation._id}</b>
            </p>
            <p>
              <b>Movie:</b> {this.state.reservation.screening.name}
            </p>
            <p>
              <b>Number of tickets: </b>
              {this.state.reservation.seats.length}
            </p>
            <p>
              <b>Seats: </b>{" "}
              {this.state.reservation.seats.map(
                seats => `"${seats[0]}-${seats[1]}" `
              )}
            </p>
            <p>
              <b>Total price: </b>
              {this.state.reservation.totalPrice}$
            </p>
            <Link
              style={{ color: "white ", textTransform: "uppercase" }}
              to="/"
            >
              Back
            </Link>
          </div>
        )}
      </div>
    );
  }
}
export default Reservation;
