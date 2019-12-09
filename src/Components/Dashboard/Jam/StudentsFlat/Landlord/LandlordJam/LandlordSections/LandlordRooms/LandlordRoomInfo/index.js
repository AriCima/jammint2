import React, { useState, useEffect } from 'react';

import DataService from '../../../../../../../../services/DataService';
import NewRoomForm from '../../../../../../../../UI/Forms/StudentsFlat/NewRoomForm'
import NewBookingForm from '../../../../../../../../UI/Forms/StudentsFlat/NewBookingForm'
import NewInvitationForm from '../../../../../../../../UI/Forms/StudentsFlat/NewInvitationForm'

import RoomBookings from './RoomBookings';
import { connect } from 'react-redux';
import ButtonPlain from '../../../../../../../../UI/ButtonPlain'

// CSS
import './index.css';

const LandlordRoomInfo = (props) => {

  const { jamId, roomId, roomInfo, roomBookings, activeScreen } = props;

  const [screen, setScreen] = useState(props.activeScreen)

  const onNewRoom = (jamId) => {
    // setNewRoom(true)
    setScreen('newRoomForm')
  };
  const onNewBooking = () => {
    // setNewBooking(true)
    setScreen('newBookingForm')
  };
  const onNewInvitation = () => {
    // setNewInvitation(true)
    setScreen('newInvitationForm')
  };

  useEffect(() => {
    if (activeScreen === 'newRoomForm'){
        setScreen('newRoomForm');
    } else if (activeScreen === 'newInvitationForm'){
        setScreen('newInvitationForm');
    } else if (activeScreen === 'newBookingForm'){
        setScreen('newBookingForm');
    } else if (activeScreen === 'roomInfo') {
        setScreen('roomInfo')
    } else if (activeScreen === 'overview') {
        setScreen('overview')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScreen])

  return(
    <div className="room-info-wrapper">
        
        { screen === 'newRoomForm' &&  
           <div className="new-Room-wrapper">
               <NewRoomForm 
                    jamId={jamId} 
                    clickHandle={onNewRoom}
                />
           </div>
        }

        { screen === 'newBookingForm' && 

            <div className="new-booking-wrapper">
                <NewBookingForm 
                    roomInfo={roomInfo}
                    clickHandle={onNewBooking}
                />
            </div>
        }

        { screen === 'newInvitationForm' && 
            <div className="new-booking-wrapper">
                <NewInvitationForm 
                    roomInfo={roomInfo}
                    clickHandle={onNewInvitation}
                />
            </div>
        }

        { screen === 'roomInfo' && 
            <div className="room-general-info-wrapper">

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

                <div className="room-info-section">
                    <button className="room-info-section-title">
                        <p>Overview</p>
                    </button>
                </div>

                <div className="room-info-section">
                    <button className="room-info-section-title">
                        <p>Current State</p>
                    </button>
                </div>

                <div className="room-info-section">
                    <button className="room-info-section-title">
                        <p>Bookings</p>
                    </button>
                    <RoomBookings bookings={roomBookings}/>
                </div>

                <div className="room-info-section">
                    <button className="room-info-section-title">
                        <p>Room Info</p>
                    </button>
                </div>
            </div>
        }     

        { screen === 'overview' && 
            <div className="new-booking-wrapper">
                <p>THIS IS OVERVIEW</p>
            </div>
        } 

    </div>
  )
}

const mapStateToProps = state => {
    console.log('state: ', state);
    return { 
      auth: state.firebase.auth,
      jamActiveSection: state.jamSection,
      roomId: state.roomId,
      bookings: state.bookings,
      activeScreen: state.activeScreen
    }
};
  
export default connect(mapStateToProps) (LandlordRoomInfo);
