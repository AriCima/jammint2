import React from "react";

// CSS
import "./index.css";

const BookingCard = (props) => {

  const { bI  } = props;

  return (
    <div className="booking-chart-row">
      <div className="booking-chart-row-block">
        <p>{bI.bookingCode}</p>
      </div>
      <div className="booking-chart-row-block">
        <p>{bI.jammerName} {bI.jammerSurname}</p>
      </div>
      <div className="booking-chart-row-block">
        <p>{bI.checkIn}</p>
      </div>
      <div className="booking-chart-row-block">
        <p>{bI.checkOut}</p>
      </div>
      <div className="booking-chart-row-block">
        <p>{bI.rent}</p>
      </div>
      <div className="booking-chart-row-block">
        <p>{bI.deposit}</p>
      </div>
  </div>


  )
  
}

export default BookingCard;
