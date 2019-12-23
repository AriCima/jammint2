import React from 'react';
import moment from 'moment';

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

    const isEmpty = (x) => {
        const empty = Calculations.isEmpty(x)
        return empty
    }
    
    const renderRoomsChart = () => {
        return roomsBookings.map((room, i) => {
            console.log('current = ',room.roomName, ' / ', room.bookings.currentBooking, ' / ', typeof room.bookings.currentBooking, ' / ', room.bookings.currentBooking.length)
            return (
                <div className="rooms-charts-wrapper" key={i}>
                    {isEmpty(room.bookings.currentBooking) ?
                        (<div className="vacant-row">
                            <div clasaName="vacant-row-roomName">
                                <div className="room-info-block-center">
                                    <p>{room.roomName}</p>
                                </div>
                            </div>
                            <div className="room-info-vacant-row">
                                <div className="vacant-sign">
                                    <p>CURRENTLY VACANT</p>
                                </div>
                            </div>
                        </div>)
                        :
                        (<div className="room-info-line">
                            <div className="room-info-block-center">
                                <p>{room.roomName}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.bookingId}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.jammerName}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{moment(room.bookings.currentBooking.checkIn).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{moment(room.bookings.currentBooking.checkOut).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.rent}</p>
                            </div>
                            <div className="room-info-block">
                                <p>{room.bookings.currentBooking.deposit}</p>
                            </div>
                        </div>)
                    }
                </div>
            )
        })
    }

    return(
        <div className="rooms-overview-wrapper">

            <div className="rooms-info-chart">
                <div className="room-info-chart-header">
                    <div className="room-info-chart-header-block">
                        <p>Room Name</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Booking ID</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Tenant Name</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Check-In</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Check-Out</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Rent €</p>
                    </div>
                    <div className="room-info-chart-header-block">
                        <p>Deposit €</p>
                    </div>
                </div>
                {jamRoomsInfo.length !== 0 && renderRoomsChart()}
            </div>
        </div>
        

    )
}

export default RoomsOverview