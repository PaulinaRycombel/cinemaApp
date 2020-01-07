import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "../css/Screening.css";
import Legend from "./Legend";
import Seat from "./Seat";
import Button from "react-materialize/lib/Button";
import { Link, withRouter } from "react-router-dom";
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";

class Screening extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      screening: {},
      reservedSeats: [],
      seatsCount: 0,
      price: 0
    };
  }

  callMoviesAPI = async screeningId => {
    await fetch(`http://localhost:5000/screenings/${screeningId}`)
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(data => {
        console.log("data: ", data);
        this.setState({ screening: data });
      });
  };

  componentDidMount() {
    this.callMoviesAPI(this.props.match.params.screeningId);
  }
  handleClick(row, col) {
    let reservedSeats = this.state.reservedSeats;
    let seatsCount = this.state.seatsCount;
    let price = this.state.price;
    if (reservedSeats.some(tab => tab[0] === row && tab[1] === col)) {
      reservedSeats = reservedSeats.filter(
        tab => !(tab[0] === row && tab[1] === col)
      );
      price -= 10;
      --seatsCount;
    } else {
      ++seatsCount;
      price += 10;
      reservedSeats.push([row, col]);
    }
    this.setState({
      seatsCount: seatsCount,
      price: price,
      reservedSeats: reservedSeats
    });
    console.log(this.state);
  }
  handleButtonClick = async () => {
    console.log(
      JSON.stringify({
        screeningId: this.state.screening._id,
        seats: this.state.reservedSeats,
        totalPrice: this.state.price
      })
    );
    await fetch("http://localhost:5000/reservations", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        screeningId: this.state.screening._id,
        seats: this.state.reservedSeats,
        totalPrice: this.state.price
      })
    })
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(data => {
        console.log(data._id);
        this.props.history.push(`/reservations/${data._id}`);
      })
      .catch(function(res) {
        console.log(res);
      });
  };

  render() {
    return (
      <div>
        <Legend />
        {Object.entries(this.state.screening).length === 0 ? (
          "loading..."
        ) : (
          <div
            className="seats-wraper"
            style={{
              gridTemplateRows: `repeat(${this.state.screening.auditorium.seatsStruct.length}, 1fr)`,
              gridTemplateColumns: `repeat(${this.state.screening.auditorium.seatsStruct[0].length}, 1fr)`
            }}
          >
            {this.state.screening.auditorium.seatsStruct.map((tab, i) =>
              tab.map((el, j) => (
                <Seat
                  inactive={el}
                  row={i}
                  col={j}
                  onClick={this.handleClick}
                ></Seat>
              ))
            )}
          </div>
        )}
        <div className="centered">
          <p>Wybrane miejsca : {this.state.seatsCount}</p>
          <p>Cena: {this.state.price}$</p>
          <br />
          {this.state.seatsCount ? (
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
              Book
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Screening;
