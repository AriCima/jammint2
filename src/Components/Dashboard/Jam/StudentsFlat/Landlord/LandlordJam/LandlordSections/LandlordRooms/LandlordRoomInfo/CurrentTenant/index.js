import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Calculations from '../../../../../../../../../services/Calculations';

// CSS
import './index.css';

const CurrentTenant = (props) => {

    const [currentTenant, setCurrentTenant] = useState(props.roomBookings);
    
    const existRoomBookings = currentTenant.length;
    console.log('existroomBookings: ', existRoomBookings);

    if (existRoomBookings ){
        const roomBookings = Calculations.organizeRoomBookings(currentTenant)
        setCurrentTenant(roomBookings)
    };
    

    return(
        <div className="current-tenant-wrapper">

            <div className="room-section-title">
               <p>Current Tenant</p>
            </div>
           
            { currentTenant.currentBooking ? 
                <div className="current-tenant-info">

                    <div className="current-tenant-info-header">

                        <div className="tenant-img">
                            <img src="/" alt="img" />
                        </div>

                        <div className="current-tenant-personal-info">
                            <div className="current-tenant-personal-info-upperline">
                                <p>{currentTenant.jammerName} {currentTenant.jammerSurname}, {currentTenant.jammerCountry}</p>
                            </div>
                            <div className="current-tenant-personal-info-line">
                                <p>{currentTenant.jammerEmail}, Mobile: {currentTenant.jammerMobile},  Tel: {currentTenant.jammerTel}</p>
                            </div>
                        </div>
                    </div>

                    <div className="current-tenant-info-contract">
                        <p>Check-In: <span>{currentTenant.checkIn}</span></p> 
                        <p>Check-Out: <span>{currentTenant.checkOut}</span></p>
                        <p>Rent: <span>{currentTenant.rent}</span></p>
                        <p>Deposit: <span>{currentTenant.deposit}</span></p>
                    </div>

                    <div className="current-tenant-info-comments">
                        <p>Comments area</p>
                    </div>

                </div>

                :
                <div className="no-current-booking">
                    {CurrentTenant.nextBooking ?
                        <p>Vacant until <span>{moment(CurrentTenant.nextBooking.checkIn).format('DD/MM')}</span></p>
                        :
                        <p>This room is currently <span>VACANT</span></p>
                    }
                </div>
            }
         
        </div>
        
    )
}

export default CurrentTenant