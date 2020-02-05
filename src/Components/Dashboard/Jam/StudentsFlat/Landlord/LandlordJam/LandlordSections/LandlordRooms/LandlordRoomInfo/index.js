import React, { useState, useEffect } from 'react';

import ButtonPlain from '../../../../../../../../UI/ButtonPlain'
import CurrentTenant from './CurrentTenant';
import RoomBookings from './RoomBookings';
import moment from 'moment';
import Calculations from '../../../../../../../../services/Calculations';


// REDUX
import { connect } from 'react-redux';

// CSS
import './index.css';

const LandlordRoomInfo = ({ roomInfo }) => {

  const orderedBookings = Calculations.organizeBookings(roomInfo.bookingsSummary);
  const noNextBooking = Calculations.isEmpty(orderedBookings.nextBooking);
  const noCurrentTenant = Calculations.isEmpty(orderedBookings.currentBooking);


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
        <div className="rooms-sections-wrapper">
            <h4>This is Room Nr {roomInfo.roomName}</h4>

            <div className="room-buttons-area">

                <ButtonPlain 
                    type='button'
                    text='New Booking'
                    clickHandle={onNewBooking}
                />

                <ButtonPlain 
                    type='button'
                    text='Invite'
                    clickHandle={onNewInvitation}
                />
            </div>
           
            { !noCurrentTenant ? (
              <div className="room-section-content">
                  <CurrentTenant orderedBookings={orderedBookings} />
              </div>
            )
            :
            (
              <div className="no-current-booking">
                {!noNextBooking?
                  <p>Vacant until <span>{moment(orderedBookings.nextBooking.checkIn).format('DD/MM')}</span></p>
                  :
                  <p>This room is currently <span>VACANT</span></p>
                }
              </div>
            )

            }
            
            <div className="room-section-content">
                <RoomBookings roomInfo={roomInfo} />
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
