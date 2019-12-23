import React, { useState } from 'react';

import Calculations from '../../../../../../../../services/Calculations';

// CSS
import './index.css';

const RoomsOverview = ({jamRoomsInfo}) => {
    // jamRoomsInfo --> array con bookingsSummary  + roomInfo de cada hab
    // jamRoomsInfo = [ {bookingsSummary: [{}..{}]}, roomInfo ]
    console.log('jamRoomsInfo: ', jamRoomsInfo);

    
    let roomsBookings = []
    
    for (let i = 0; i < jamRoomsInfo.length ; i++ ){
        const orderedBookings = Calculations.organizeBookings(jamRoomsInfo[i].bookingsSummary)
        const roomName = jamRoomsInfo[i].roomName;
        const roomBookingsSummary = {roomName: roomName, bookings: orderedBookings}
        roomsBookings.push(roomBookingsSummary)
    }


    // console.log('roomsBookings = ', roomsBookings)
    
    const renderRoomsChart = () => {
        return roomsBookings.map((room, i) => {
            console.log('roomsBookings = ',roomsBookings)
            return (
                <div className="room-info-line">
                    <div className="room-info-block">
                        <p>{room.roomName}</p>
                    </div>
                    {room.bookings.currentBooking.length === 0 ?
                        <>
                            <div className="room-info-vacant-row">
                                <div className="vacant-sign">
                                    <p>CURRENTLY VACANT</p>
                                </div>
                            </div>
                        </>
                        :
                        <>  <div className="room-info-block">
                                <p>{room.bookings.currentBooking.bookingId}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.jammerName}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.checkIn}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.checkOut}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.rent}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.deposit}</p>
                            </div>
                        </>
                    }
                </div>
            )
        })
    }

    return(
        <div className="rooms-overview-wrapper">

            <div className="rooms-info-chart">
                <div className="room-info-chart-header">
                    <div className="room-info-chart-block">
                        <p>Room Name</p>
                    </div>
                    <div className="room-info-chart-block">
                        <p>Booking ID</p>
                    </div>
                    <div className="room-info-chart-block">
                        <p>Tenant Name</p>
                    </div>
                    <div className="room-info-chart-block">
                        <p>Check-In</p>
                    </div>
                    <div className="room-info-chart-block">
                        <p>Check-Out</p>
                    </div>
                </div>
                {jamRoomsInfo.length !== 0 && renderRoomsChart()}
            </div>
        </div>
        

    )
}

export default RoomsOverview