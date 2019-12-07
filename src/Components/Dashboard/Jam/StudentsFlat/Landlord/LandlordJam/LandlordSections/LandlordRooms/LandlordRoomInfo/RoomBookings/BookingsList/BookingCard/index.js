import React from "react";
import NewBookingForm from '../../../../../../../../../../../UI/Forms/StudentsFlat/NewAccommodationForm';


// CSS
import "./index.css";

const BookingCard = (props) => {

  const { bI  } = props;
  const bookingId = bI.id;

  return (

    <div className="booking-card-wrapper">
      <p>Booking ID: {bookingId}</p>

      <NewBookingForm />

    </div>
  )
  
}

export default BookingCard;
