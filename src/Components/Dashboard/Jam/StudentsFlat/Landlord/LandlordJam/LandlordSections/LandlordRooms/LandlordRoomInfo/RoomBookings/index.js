import React, { useState } from 'react';
import moment from 'moment';

import Calculations from '../../../../../../../../../services/Calculations';
import BookingsList from './BookingsList';
import BookingCard from './BookingsList/BookingCard';
// CSS
import './index.css';

const RoomBookings = (props) => {

    const [roomBookings, setRoomBookings] = useState(props.bookings);
    const [currentBooking, setCurrentBooking] = useState({});
    // const [nextBooking, setNextBooking] = useState({});
    const [futureBookings, setFutureBookings] = useState({});
    const [dueContracts, setDueContracts] = useState([]);

    const existBookings = roomBookings.length;
    if (existBookings ){
        const bookings = Calculations.organizeBookings(roomBookings)
        setRoomBookings(bookings)
        setCurrentBooking(bookings.currentBooking)
        setFutureBookings(bookings.futureBookings)
        setDueContracts(bookings.dueContracts)
        // setNextBooking(bookings.nextBooking)
    };
    
    return(
        <div className="room-bookings-wrapper">
            
            <div className="room-section-title">
               <p>Room Booings and Contracts</p>
            </div>

            <div className="room-booking-section">
                <div className="room-section-title">
                    <p>Future Bookings</p>
                </div>
                <BookingsList bookings={futureBookings} />
            </div>

            <div className="room-booking-section">
                <div className="room-section-title">
                    <p>Current contract</p>
                </div>
                <BookingCard bookings={currentBooking} />
            </div>

            <div className="room-booking-section">
                <div className="room-section-title">
                    <p>Due contracts</p>
                </div>
                <BookingsList bookings={dueContracts} />
            </div>

        </div>
        

    )
}

export default RoomBookings