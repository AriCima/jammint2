import React from 'react';

// CSS
import './index.css';

const RoomInfo = (roomInfo) => {

    return(
        <div className="room-section-wrapper">
           <div className="room-section-title">
               <p>Room Info</p>
           </div>

           <div className="room-info-block">
                <p>Room Name: {roomInfo.roomName}</p>
           </div>
           <div className="room-info-block">
                <p>Room size: {roomInfo.roomName} sqm</p>
           </div>
           <div className="room-info-block">
               <p>Exterior: {roomInfo.exterior}</p>
           </div>
           <div className="room-info-block">
               <p>Balcony: {roomInfo.ebalcony}</p>
           </div>
           <div className="room-info-block">
               <p>Private Bathroom: {roomInfo.privateBathroom}</p>
           </div>
        </div>
        

    )
}

export default RoomInfo