import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Calculations from '../../../../../../../../../services/Calculations';
import BookingsList from './BookingsList';
import BookingCard from './BookingsList/BookingCard';
// CSS
import './index.css';


const RoomBookings = ({ roomInfo, roomId }) => {
    const [orderedBookings, setOrderedBookings] = useState({});
    const [existsCurrentTenant, setExistsCurrentTenant] = useState(false);
    const [existsNextBooking, setExistsNextBooking] = useState(false);
    const [existsDueContracts, setExistsDueContracts] = useState(false);

    const emptyBookings = Calculations.isEmpty(roomInfo);

    useEffect(() => {
        if (!emptyBookings) {
            setOrderedBookings(Calculations.organizeBookings(roomInfo.bookingsSummary));
            setExistsNextBooking(Calculations.isEmpty(orderedBookings.nextBooking));
            setExistsCurrentTenant(Calculations.isEmpty(orderedBookings.currentBooking));
            setExistsDueContracts(Calculations.isEmpty(orderedBookings.dueContracts));
        }
    }, [roomInfo]);


    const anyBookings = Calculations.isEmpty(orderedBookings);


    return (
        <>
            {!Object.keys(roomInfo).length
                ? <h1>no rooms</h1>
                : (
                    <div className="room-bookings-wrapper">

                        <div className="room-section-title">
                            <p>Room Booings and Contracts</p>
                        </div>

                        <div className="room-booking-section">
                            <div className="room-section-title">
                                <p>Future Bookings</p>
                            </div>
                            <div className="room-booking-section-content">
                                {existsNextBooking
                                    ? <BookingsList bookings={orderedBookings.futureBookings} />
                                    : <p>There are no bookings for this room yet</p>}
                            </div>
                        </div>

                        <div className="room-booking-section">
                            <div className="room-section-title">
                                <p>Current contract</p>
                            </div>
                            <div className="room-booking-section-content">
                                { existsCurrentTenant
                                    ? <BookingsList bookings={orderedBookings.currentBooking} />
                                    : (
                                        <div className="no-current-booking">
                                            {existsNextBooking
                                                ? (
                                                    <p>
This room is VACANT until
                                                        <span>{moment(orderedBookings.nextBooking.checkIn).format('DD/MM')}</span>
                                                    </p>
                                                )
                                                : (
                                                    <p>
This room is currently
                                                        <span>VACANT</span>
                                                    </p>
                                                )}
                                        </div>
                                    )}
                            </div>
                        </div>

                        <div className="room-booking-section">
                            <div className="room-section-title">
                                <p>Due contracts</p>
                            </div>
                            {existsDueContracts
                                ? <BookingsList bookings={orderedBookings.dueContracts} />
                                : <p>There are contracts history this room yet</p>}
                        </div>

                    </div>
                )}

        </>

    );
};

export default RoomBookings;
