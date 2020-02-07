import React, { useState, useEffect } from 'react';

import ButtonPlain from '../../../../../../../../UI/ButtonPlain'
import CurrentTenant from './CurrentTenant';
import RoomBookings from './RoomBookings';
import BookingsGraphic from '../../../../../../../../Bookings/BkgsGraphic';
import moment from 'moment';
import Calculations from '../../../../../../../../services/Calculations';

// CSS
import './index.css';

const LandlordRoomInfo = ({ roomInfo }) => {

  const orderedBookings = Calculations.organizeBookings(roomInfo.bookingsSummary);
  const noNextBooking = Calculations.isEmpty(orderedBookings.nextBooking);
  const noCurrentTenant = Calculations.isEmpty(orderedBookings.currentBooking);
  const bookingsSummary = roomInfo.bookingsSummary;

  const onNewRoom = (jamId) => {
    alert('NEW ROOM')
  };
  const onNewBooking = (roomId) => {
   alert('NEW BOOKING')
  };
  const onNewInvitation = (roomId) => {
    alert('NEW INVITATION')
  };

  console.log('orderedBookings en RoomInfo: ', orderedBookings);
  return(
    <div className="room-info-wrapper">
        <div className="room-sections-wrapper">

            <div className="room-header">
              <div className="room-header-title">
                <h4>Room Nr {roomInfo.roomName}</h4>
              </div>

              <div className="room-buttons-area">
                <div className="room-button-block">
                  <ButtonPlain 
                    type='button'
                    text='New Booking'
                    clickHandle={onNewBooking}
                  />
                </div>
                <div className="room-button-block">
                  <ButtonPlain 
                    type='button'
                    text='Invite'
                    clickHandle={onNewInvitation}
                  />
                </div>
              </div>
            </div>
            
            <div className="booking-graphic">
              <BookingsGraphic bookingsSummary={bookingsSummary} />

            </div>

            { !noCurrentTenant ? (
                <div className="room-section">
                  <CurrentTenant orderedBookings={orderedBookings} />
                </div>
              )
              :
              (
                <div className="room-section">
                  {!noNextBooking?
                    <div className="no-current-tenant-line">
                      <p>Vacant until <span>{moment(orderedBookings.nextBooking.checkIn).format("DD MMM YYYY")}</span></p>
                    </div>
                    :
                    <div className="no-current-tenant-line">
                      <p>This room is currently <span>VACANT</span></p>
                    </div>
                  }
                </div>
              )

            }
            
            <div className="room-section">
                <RoomBookings orderedBookings={orderedBookings} />
            </div>
           
            {/*  <div className="room-section-content">
                <RoomInfo 
                    roomInfo={roomInfo}
                />
            </div> */}
        </div>

    </div>
  )
}

// const mapStateToProps = state => {
//     return { 
//       auth: state.firebase.auth,
//       jamActiveSection: state.jamSection,
//       roomId: state.roomId,
//       bookings: state.bookings,
//       activeScreen: state.activeScreen
//     }
// };
  
// export default connect(mapStateToProps) (LandlordRoomInfo);
export default LandlordRoomInfo;
