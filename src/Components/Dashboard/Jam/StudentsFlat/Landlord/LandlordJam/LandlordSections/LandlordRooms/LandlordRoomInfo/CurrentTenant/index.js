import React, { useState, useEffect } from 'react';
import moment from 'moment';

// CSS
import './index.css';

const CurrentTenant = ({ orderedBookings }) => {
    return(
        <div className="current-tenant-wrapper">

            <div className="current-tenant-section-title">
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
                    </div>
                </div>

                <div className="current-tenant-info-contract">

                    <div className="current-tenant-info-contract-line">
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Check-In: </p> 
                            </div>
                            <div className="contract-line-value">
                                <p>{moment(orderedBookings.currentBooking.checkIn).format("DD MMM YYYY")}</p>
                            </div>
                        </div>
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Check-Out: </p> 
                            </div>
                            <div className="contract-line-value">
                                <p>{orderedBookings.currentBooking.checkOut}</p>
                            </div>
                        </div>
                    </div>

                    <div className="current-tenant-info-contract-line">
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Rent:</p> 
                            </div>
                            <div className="contract-line-value">
                                <p>{orderedBookings.currentBooking.rent}</p>
                            </div>
                        </div>
                    </div>

                    <div className="current-tenant-info-contract-line">
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Deposit:</p> 
                            </div>
                            <div className="contract-line-value">
                                <p>{orderedBookings.currentBooking.deposit}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="current-tenant-info-comments">
                    <p>Comments area</p>
                </div>

            </div>
                        
        </div>
        
    )
}

export default CurrentTenant