import React, { useState, useEffect } from 'react';

import DataService from '../../../../../../../../services/DataService';
import NewRoomForm from '../../../../../../../../UI/Forms/StudentsFlat/NewRoomForm'
import NewBookingForm from '../../../../../../../../UI/Forms/StudentsFlat/NewBookingForm'
import NewInvitationForm from '../../../../../../../../UI/Forms/StudentsFlat/NewInvitationForm'

import CurrentTenant from './CurrentTenant';
import RoomBookings from './RoomBookings';
import RoomInfo from './RoomInfo';
import RoomsOverview from './RoomsOverview';


import { connect } from 'react-redux';
import ButtonPlain from '../../../../../../../../UI/ButtonPlain'

// CSS
import './index.css';

const LandlordRoomInfo = (props) => {

  const { jamId, roomsInfo, roomBookings, activeScreen } = props;

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

        { screen === 'overview' && 
            <>
                <div className="room-section-title">
                    <p>THIS IS OVERVIEW</p>
                </div>
                <div className="room-section-content">
                    <RoomsOverview
                        roomsInfo={roomsInfo}
                        bookings={roomBookings}
                    />
                </div>
            </>
        }

        { screen === 'roomInfo' && 
            <div className="rooms-sections-wrapper">

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
       
                <div className="room-section-title">
                    <p>Current State</p>
                </div>

                <div className="room-section-content">
                    <CurrentTenant roomBookings={roomBookings}/>
                </div>

                <div className="room-section-title">
                    <p>Bookings</p>
                </div>

                <div className="room-section-content">
                    <RoomBookings 
                        roomBookings={roomBookings}
                    />
                </div>
    
                <div className="room-section-title">
                    <p>Room Info</p>
                </div>
                <div className="room-section-content">
                    <RoomInfo 
                        roomsInfo={roomsInfo}
                    />
                </div>

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
