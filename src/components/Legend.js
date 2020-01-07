import React from "react";
import "../css/Legend.css";

const Legend = () => {
  return (
    <div className="legend-wraper">
      <div className="legend-item">
        <div className="legend-box red"></div>
        Your seats
      </div>
      <div className="legend-item">
        <div className="legend-box blue-color"></div>
        Free seats
      </div>
      <div className="legend-item">
        <div className="legend-box gray"></div>
        Reserved Seats
      </div>
    </div>
  );
};
export default Legend;
