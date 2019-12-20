import React from 'react';

import Calculations from '../../../../../../../../services/Calculations';

// CSS
import './index.css';

const RoomsOverview = (roomsInfo) => {

    for (let i = 0; i < roomsInfo.length ; i++ ){
        const orderBookings = Calculations.organizeBookings(roomsInfo[i].bookingsSummary)
        const currentBooking = orderBookings.currentBooking;
        roomsInfo[i].currentBooking = currentBooking;
    }

    console.log('roomsInfo = ', roomsInfo)

    const renderRoomsChart = () => {
        return roomsInfo.map((room, i) => {
            return (
                <div className="room-info-line">
                    <div className="room-info-block">
                        <p>{room.roomName}</p>
                    </div>
                    {room.currentBooking === {} ?
                        <>
                            <div className="room-info-vacant-row">
                                <p>VACANT</p>
                            </div>
                        </>
                        :
                        <>
                            <div className="room-info-block">
                                <p>{room.currentBooking.jammerName}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.currentBooking.checkIn}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.currentBooking.checkOut}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.currentBooking.rent}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.currentBooking.deposit}</p>
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
                {renderRoomsChart()}
            </div>
        </div>
        

    )
}

export default RoomsOverview