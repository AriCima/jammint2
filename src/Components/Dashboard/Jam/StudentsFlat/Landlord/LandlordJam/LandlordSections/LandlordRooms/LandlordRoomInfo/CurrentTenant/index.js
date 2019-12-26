import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Calculations from '../../../../../../../../../services/Calculations';

// CSS
import './index.css';

const CurrentTenant = ({ roomInfo, roomId }) => {

    const [orderedBookings, setOrderedBookings] = useState({});
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
        }
    }, [roomInfo])
    

    const anyBookings = Calculations.isEmpty(orderedBookings);

    console.log('orderedBookings: ', orderedBookings);
    return(
        <div className="current-tenant-wrapper">

            <div className="room-section-title">
               <p>Current Tenant</p>
            </div>
            { anyBookings ? <p>LOADING </p>
                :
                <>
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
                            {/* <p>Check-In: <span>{orderedBookings.currentBooking.checkIn}</span></p> 
                            <p>Check-Out: <span>{orderedBookings.currentBooking.checkOut}</span></p>
                            <p>Rent: <span>{orderedBookings.currentBooking.rent}</span></p>
                            <p>Deposit: <span>{orderedBookings.currentBooking.deposit}</span></p> */} */}
                        </div>

                        <div className="current-tenant-info-comments">
                            <p>Comments area</p>
                        </div>

                    </div>

                    
                    <div className="no-current-booking">
                        {existsNextBooking?
                            <p>Vacant until <span>{moment(orderedBookings.nextBooking.checkIn).format('DD/MM')}</span></p>
                            :
                            <p>This room is currently <span>VACANT</span></p>
                        }
                    </div>
                </>
            }
        </div>
        
    )
}

export default CurrentTenant