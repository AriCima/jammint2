import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Calculations from '../../../../../../../../../services/Calculations';
import BookingsList from './BookingsList';
// CSS
import './index.css';

const RoomBookings = (props) => {

    const [roomBookings, setRoomBookings] = useState(props.bookings);
    const [currentBooking, setCurrentBooking] = useState({});
    const [nextBooking, setNextBooking] = useState({});
    const [dueBookings, setDueBookings] = useState([]);
    const [futureBookings, setFutureBookings] = useState([]);

    if (roomBookings !== {}){
        const bookings = Calculations.organizeBookings(roomBookings)
        setRoomBookings(bookings)
        setCurrentBooking(bookings.currentBooking)
        setFutureBookings(bookings.futureBookings)
        setDueBookings(bookings.dueBookings)
        setNextBooking(bookings.nextBooking)
    };
    

    return(
        <div className="room-bookings-wrapper">
            <div className="room-bookings-current">
                { roomBookings.currentBooking ? 
                    <BookingsList bookings={roomBookings.currentBooking}/>
                    :
                    <div className="no-current-booking">
                        {roomBookings.nextBooking ?
                            <p>Vacant until <span>{moment(roomBookings.nextBooking.checkIn).format('DD/MM')}</span></p>
                            :
                            <p>This room is currently <span>VACANT</span></p>
                        }
                    </div>
                }
            </div>
            <div className="dueBookings">
                <BookingsList bookings={roomBookings.dueBookings} />
            </div>
            <div className="dueBookings">
                <BookingsList bookings={roomBookings.futureBookings} />
            </div>

        </div>
        

    )
}

export default RoomBookings