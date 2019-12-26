import React, { useState } from 'react';
import moment from 'moment';

import Calculations from '../../../../../../../../../services/Calculations';
import BookingsList from './BookingsList';
import BookingCard from './BookingsList/BookingCard';
// CSS
import './index.css';


const RoomBookings = ({ roomInfo, roomId }) => {

    const [orderedBookings, setOrderedBookings] = useState({});
    const [existsCurrentTenant, setExistsCurrentTenant] = useState(false)
    const [existsNextBooking, setExistsNextBooking] = useState(false)
    
    const emptyBookings = Calculations.isEmpty(roomInfo)
    console.log('emptyBookings: ', emptyBookings);
    

    // useEffect(() => {
    //     !emptyBookings && setOrderedBookings(Calculations.organizeBookings(roomInfo.bookingsSummary))
    // }, [])

    useEffect(() => {
        if (!emptyBookings){
            setOrderedBookings(Calculations.organizeBookings(roomInfo.bookingsSummary))
            setExistsNextBooking(Calculations.isEmpty(orderedBookings.nextBooking))
            setExistsCurrentTenant(Calculations.isEmpty(orderedBookings.currentBooking))
        }
    }, [roomInfo])
    

    const anyBookings = Calculations.isEmpty(orderedBookings);

    
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
                <BookingsList bookings={currentBooking} />
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