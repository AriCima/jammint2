import React from 'react';

// CSS
import './index.css';

const RoomsOverview = (roomBookings, roomsInfo) => {

    const superObject = roomBookings + roomsInfo;

    const renderRoomsChart = () => {

        return superObject.map((room, i) => {
            return (
                <div className="room-info-line">
                    <div className="room-info-block">
                        <p>{room.roomName}</p>
                    </div>
                    <div className="room-info-block">
                        <p>{room.jammerName} {room.jammerSurname}</p>
                    </div>
                    <div className="room-info-block">
                        <p>{room.checkIn}</p>
                    </div>
                    <div className="room-info-block">
                        <p>{room.checkOut}</p>
                    </div>
                </div>
            )
        })
    }

    return(
        <div className="rooms-overview-wrapper">
            <p>This is Rooms Overview</p>

            <div className="rooms-info-chart">
                <div className="room-info-chart-title">
                    <div className="room-info-chart-title-block">
                        <p>Room Name</p>
                    </div>
                    <div className="room-info-chart-title-block">
                        <p>Tenant Name</p>
                    </div>
                    <div className="room-info-chart-title-block">
                        <p>Check-In</p>
                    </div>
                    <div className="room-info-chart-title-block">
                        <p>Check-Out</p>
                    </div>
                </div>
                {renderRoomsChart}
            </div>
        </div>
        

    )
}

export default RoomsOverview