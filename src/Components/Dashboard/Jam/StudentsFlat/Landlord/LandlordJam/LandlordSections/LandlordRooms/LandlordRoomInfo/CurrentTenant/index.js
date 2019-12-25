import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Calculations from '../../../../../../../../../services/Calculations';

// CSS
import './index.css';

const CurrentTenant = ({ roomInfo, roomId }) => {

    const [roomBookings, setRoomsBookings] = useState({});
    console.log('roomInfo: ', roomInfo);
    
    useEffect(() => {
        effect
        return () => {
            cleanup
        };
    }, [input])

    const orderedBookings = Calculations.organizeBookings(bookingsSummary)

    return(
        <div className="current-tenant-wrapper">

            <div className="room-section-title">
               <p>Current Tenant</p>
            </div>
    
           <div className="current-tenant-info">

                <div className="current-tenant-info-header">

                    <div className="tenant-img">
                        <img src="/" alt="img" />
                    </div>

                    <div className="current-tenant-personal-info">
                        <div className="current-tenant-personal-info-upperline">
                            <p>{orderedBookings.currentBooking.jammerName}</p>
                        </div>
                        {/* <div className="current-tenant-personal-info-line">
                            <p>{currentTenant.jammerEmail}, Mobile: {currentTenant.jammerMobile},  Tel: {currentTenant.jammerTel}</p>
                        </div> */}
                    </div>
                </div>

                <div className="current-tenant-info-contract">
                    <p>Check-In: <span>{orderedBookings.currentBooking.checkIn}</span></p> 
                    <p>Check-Out: <span>{orderedBookings.currentBooking.checkOut}</span></p>
                    <p>Rent: <span>{orderedBookings.currentBooking.rent}</span></p>
                    <p>Deposit: <span>{orderedBookings.currentBooking.deposit}</span></p>
                </div>

                <div className="current-tenant-info-comments">
                    <p>Comments area</p>
                </div>

            </div>

            
             {/* <div className="no-current-booking">
                {roomsBookings.bookings.nextBooking ?
                    <p>Vacant until <span>{moment(CurrentTenant.nextBooking.checkIn).format('DD/MM')}</span></p>
                    :
                    <p>This room is currently <span>VACANT</span></p>
                }
            </div>
          */}
        </div>
        
    )
}

export default CurrentTenant