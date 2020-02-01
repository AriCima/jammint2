import React, { useState, useEffect } from 'react';

import ButtonPlain from '../../../../../../../../UI/ButtonPlain'
import NewRoomForm from '../../../../../../../../UI/Forms/StudentsFlat/NewRoomForm'
import NewBookingForm from '../../../../../../../../UI/Forms/StudentsFlat/NewBookingForm'
import NewInvitationForm from '../../../../../../../../UI/Forms/StudentsFlat/NewInvitationForm'
import CurrentTenant from './CurrentTenant';
import RoomBookings from './RoomBookings';
import RoomInfo from './RoomInfo';

// REDUX
import { connect } from 'react-redux';

// CSS
import './index.css';

const LandlordRoomInfo = (props) => {
  const { roomInfo } = props;
  console.log('roomInfo: ', roomInfo);

//   const [screen, setScreen] = useState(props.activeScreen)

  const onNewRoom = (jamId) => {
    alert('NEW ROOM')
  };
  const onNewBooking = (roomId) => {
   alert('NEW BOOKING')
  };
  const onNewInvitation = (roomId) => {
    alert('NEW INVITATION')
  };


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
           
            <div className="room-section-content">
                <CurrentTenant roomInfo={roomInfo} />
            </div>
            
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

const mapStateToProps = state => {
    return { 
      auth: state.firebase.auth,
      jamActiveSection: state.jamSection,
      roomId: state.roomId,
      bookings: state.bookings,
      activeScreen: state.activeScreen
    }
};
  
export default connect(mapStateToProps) (LandlordRoomInfo);
